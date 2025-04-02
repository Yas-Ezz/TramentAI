import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI('AIzaSyBfJSDjouW9YyC4yUkYHbkX9QvBLPS8HAw');

export async function getTradeAnalysis(tradeData: any) {
  try {
    const model = genAI.getGenerativeModel({ model: 'gemini-pro' });

    const prompt = `Analyze this trading data and provide insights:
    Asset: ${tradeData.asset}
    Entry Price: ${tradeData.entryPrice}
    Exit Price: ${tradeData.exitPrice}
    Profit/Loss: ${tradeData.profitLoss}

    Please provide:
    1. Analysis of the trade
    2. What went well
    3. Areas for improvement
    4. Specific recommendations`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    return response.text();
  } catch (error) {
    console.error('Error getting trade analysis:', error);
    throw error;
  }
}

export async function getPlatformTips(platform: string) {
  try {
    const model = genAI.getGenerativeModel({ model: 'gemini-pro' });

    const prompt = `Provide specific trading tips and best practices for the ${platform} trading platform. Focus on:
    1. Platform-specific features
    2. Common pitfalls to avoid
    3. Advanced techniques
    4. Integration tips with other tools`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    return response.text();
  } catch (error) {
    console.error('Error getting platform tips:', error);
    throw error;
  }
}

export async function getMarketAnalysis(asset: string) {
  try {
    const model = genAI.getGenerativeModel({ model: 'gemini-pro' });

    const prompt = `Provide a comprehensive analysis for ${asset} trading. Include:
    1. Key technical indicators to watch
    2. Common trading patterns
    3. Risk management strategies
    4. Market conditions to be aware of`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    return response.text();
  } catch (error) {
    console.error('Error getting market analysis:', error);
    throw error;
  }
}