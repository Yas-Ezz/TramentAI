import { AIResponse, InsightContent, InsightSection } from './types';
import { AIServiceError } from './errorHandler';

export function parseAIResponse(response: string): AIResponse {
  try {
    // First try to find JSON content between markers
    const jsonMatch = response.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      return createFallbackResponse(response);
    }

    const jsonStr = jsonMatch[0].trim();
    let parsed: any;

    try {
      // Clean the JSON string before parsing
      const cleanJson = jsonStr
        .replace(/[\u0000-\u001F]+/g, ' ') // Remove control characters
        .replace(/\\[^"\/bfnrtu]/g, '\\\\') // Escape unescaped backslashes
        .replace(/\n/g, '\\n') // Handle newlines
        .replace(/\r/g, '\\r') // Handle carriage returns
        .replace(/([{,]\s*)(\w+)(\s*:)/g, '$1"$2"$3'); // Quote unquoted keys
      
      parsed = JSON.parse(cleanJson);
    } catch (e) {
      console.error('JSON parse error:', e);
      return createFallbackResponse(response);
    }

    // Validate and clean sections
    if (!parsed?.sections?.length) {
      return createFallbackResponse(response);
    }

    const validatedSections: InsightSection[] = parsed.sections
      .filter((section: any) => section?.title && Array.isArray(section?.content))
      .map((section: any) => ({
        title: section.title.trim(),
        type: section.type || 'default',
        content: section.content
          .filter((item: any) => item?.text)
          .map((item: any) => ({
            type: item.type || 'text',
            text: item.text.trim(),
            ...(item.url && { url: item.url.trim() }),
            ...(item.description && { description: item.description.trim() })
          }))
      }))
      .filter((section: any) => section.content.length > 0);

    if (validatedSections.length === 0) {
      return createFallbackResponse(response);
    }

    return { sections: validatedSections };
  } catch (error) {
    console.error('Error parsing AI response:', error);
    return createFallbackResponse(response);
  }
}

function createFallbackResponse(response: string): AIResponse {
  // Extract meaningful content from the response
  const lines = response
    .split(/\n/)
    .map(line => line.trim())
    .filter(line => line.length > 0);

  let currentSection: { title: string; content: string[] } = {
    title: 'Insights',
    content: []
  };

  const sections: { title: string; content: string[] }[] = [];

  for (const line of lines) {
    if (line.match(/^[A-Z][\w\s]+:?$/)) {
      // This looks like a section title
      if (currentSection.content.length > 0) {
        sections.push({ ...currentSection });
      }
      currentSection = {
        title: line.replace(/:$/, ''),
        content: []
      };
    } else if (line.startsWith('- ') || line.startsWith('• ')) {
      // This is a bullet point
      currentSection.content.push(line.replace(/^[-•]\s+/, ''));
    } else if (line.match(/^\d+\./)) {
      // This is a numbered point
      currentSection.content.push(line.replace(/^\d+\.\s+/, ''));
    } else if (currentSection.content.length > 0) {
      // Append to previous content if it seems to be a continuation
      currentSection.content[currentSection.content.length - 1] += ' ' + line;
    } else {
      // Start new content
      currentSection.content.push(line);
    }
  }

  if (currentSection.content.length > 0) {
    sections.push(currentSection);
  }

  return {
    sections: sections.map(section => ({
      title: section.title,
      type: 'default',
      content: section.content.map(text => ({
        type: 'text',
        text: text.trim()
      }))
    }))
  };
}