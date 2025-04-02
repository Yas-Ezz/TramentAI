import { GoogleGenerativeAI } from '@google/generative-ai';
import { TradeData, TradingMetrics, AIResponse } from './types';
import { generateDashboardPrompt, generatePlatformContentPrompt } from './prompts';
import { parseAIResponse } from './parser';
import { AIServiceError } from './errorHandler';

const API_KEY = 'AIzaSyBfJSDjouW9YyC4yUkYHbkX9QvBLPS8HAw';
const genAI = new GoogleGenerativeAI(API_KEY);
const model = genAI.getGenerativeModel({ model: 'gemini-pro' });

const MAX_RETRIES = 2;
const RETRY_DELAY = 1000;

export class AIService {
  private static async retryOperation<T>(
    operation: () => Promise<T>,
    retries = MAX_RETRIES
  ): Promise<T> {
    let lastError: unknown;

    for (let i = 0; i <= retries; i++) {
      try {
        return await operation();
      } catch (error) {
        lastError = error;
        if (i < retries) {
          await new Promise(resolve => setTimeout(resolve, RETRY_DELAY));
          continue;
        }
      }
    }

    throw new AIServiceError('Operation failed after retries', lastError);
  }

  static async getDashboardInsights(
    metrics: TradingMetrics,
    recentTrades: TradeData[]
  ): Promise<AIResponse> {
    if (!metrics || !recentTrades?.length) {
      throw new AIServiceError('Missing required metrics or trade data');
    }

    return this.retryOperation(async () => {
      try {
        const prompt = generateDashboardPrompt(metrics, recentTrades);
        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();
        
        if (!text) {
          throw new AIServiceError('Empty response from AI service');
        }
        
        return parseAIResponse(text);
      } catch (error) {
        throw new AIServiceError('Failed to generate dashboard insights', error);
      }
    });
  }

  static async getPlatformContent(
    platform: string,
    userMetrics: TradingMetrics
  ): Promise<AIResponse> {
    if (!platform || !userMetrics) {
      throw new AIServiceError('Missing platform or metrics data');
    }

    return this.retryOperation(async () => {
      try {
        const prompt = generatePlatformContentPrompt(platform, userMetrics);
        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();
        
        if (!text) {
          throw new AIServiceError('Empty response from AI service');
        }
        
        return parseAIResponse(text);
      } catch (error) {
        throw new AIServiceError('Failed to generate platform content', error);
      }
    });
  }
}