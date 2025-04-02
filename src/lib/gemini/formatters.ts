import { InsightSection, Link } from './types';

function extractLinks(text: string): Link[] {
  const urlRegex = /(https?:\/\/[^\s]+)/g;
  const links: Link[] = [];
  let match;

  while ((match = urlRegex.exec(text)) !== null) {
    const url = match[0];
    const textBefore = text.slice(0, match.index).trim();
    const lastPeriodIndex = textBefore.lastIndexOf('.');
    const linkText = lastPeriodIndex !== -1 
      ? textBefore.slice(lastPeriodIndex + 1) 
      : textBefore;

    links.push({
      text: linkText || url,
      url: url
    });
  }

  return links;
}

function cleanInsightText(text: string): string {
  return text
    .replace(/^[-•*]\s+/g, '')
    .replace(/^\d+\.\s+/g, '')
    .replace(/\bhttps?:\/\/[^\s]+\b/g, '')
    .trim();
}

export function parseInsightSections(content: string): InsightSection[] {
  const sections = content.split('\n\n').map(section => {
    const [title, ...lines] = section.split('\n');
    const cleanTitle = title.replace(/^\d+\.\s*/, '').replace(':', '').trim();
    
    const content = lines
      .filter(line => line.trim())
      .map(line => {
        const cleanText = cleanInsightText(line);
        const links = extractLinks(line);
        return links.length > 0 
          ? `${cleanText} ${links.map(link => `[${link.text}](${link.url})`).join(' ')}`
          : cleanText;
      });

    const type = cleanTitle.toLowerCase().includes('tools') 
      ? 'tools'
      : cleanTitle.toLowerCase().includes('resources') || cleanTitle.toLowerCase().includes('tutorial')
        ? 'resources'
        : 'default';

    return {
      title: cleanTitle,
      content,
      type
    };
  });

  return sections.filter(section => section.content.length > 0);
}