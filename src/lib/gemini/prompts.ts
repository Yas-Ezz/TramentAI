import { TradeData, TradingMetrics } from './types';

export function generateDashboardPrompt(metrics: TradingMetrics, recentTrades: TradeData[]) {
  return `Analyze this trading data and provide detailed insights in a structured JSON format. Response must be valid JSON:

{
  "sections": [
    {
      "title": "Performance Overview",
      "type": "default",
      "content": [
        {
          "type": "text",
          "text": "Detailed analysis of overall trading performance..."
        }
      ]
    },
    {
      "title": "Key Strengths",
      "type": "default",
      "content": [
        {
          "type": "text",
          "text": "Identified strengths in trading strategy..."
        }
      ]
    },
    {
      "title": "Areas for Improvement",
      "type": "default",
      "content": [
        {
          "type": "text",
          "text": "Specific areas needing attention..."
        }
      ]
    },
    {
      "title": "Risk Management Tips",
      "type": "default",
      "content": [
        {
          "type": "text",
          "text": "Actionable risk management advice..."
        }
      ]
    },
    {
      "title": "Next Steps",
      "type": "default",
      "content": [
        {
          "type": "text",
          "text": "Recommended actions to improve performance..."
        }
      ]
    }
  ]
}

Trading Metrics Analysis:
- Win Rate: ${(metrics.winLossRatio * 100).toFixed(1)}%
- Average Return: $${metrics.averageROI.toFixed(2)}
- Best Trade: $${metrics.bestTrade.toFixed(2)}
- Worst Trade: $${metrics.worstTrade.toFixed(2)}
- Total Trades: ${metrics.totalTrades}

Recent Trade History:
${recentTrades.map(trade => 
  `${trade.asset}: Entry $${trade.entryPrice} → Exit $${trade.exitPrice} (${trade.profitLoss >= 0 ? '+' : ''}$${trade.profitLoss})`
).join('\n')}

Please provide:
1. Comprehensive performance analysis
2. Pattern recognition in trading behavior
3. Specific strengths in the trading approach
4. Clear areas for improvement
5. Risk management recommendations
6. Actionable next steps

Important: 
- Response must be valid JSON matching the structure above
- Each section should have 2-4 detailed insights
- Focus on actionable advice
- Include specific examples from the trading data
- Highlight both positive patterns and areas of concern`;
}

export function generatePlatformContentPrompt(platform: string, metrics: TradingMetrics) {
  return `Analyze this trading platform and metrics to provide structured insights in JSON format:

{
  "sections": [
    {
      "title": "Platform-Specific Tips",
      "type": "default",
      "content": [
        {
          "type": "text",
          "text": "Detailed platform-specific trading tip..."
        }
      ]
    },
    {
      "title": "Recommended Tools",
      "type": "tools",
      "content": [
        {
          "type": "link",
          "text": "Tool Name",
          "url": "https://example.com",
          "description": "Detailed tool description and use case..."
        }
      ]
    },
    {
      "title": "Learning Resources",
      "type": "resources",
      "content": [
        {
          "type": "link",
          "text": "Resource Title",
          "url": "https://example.com",
          "description": "Specific benefits of this resource..."
        }
      ]
    },
    {
      "title": "Advanced Features",
      "type": "default",
      "content": [
        {
          "type": "text",
          "text": "Platform-specific advanced feature explanation..."
        }
      ]
    }
  ]
}

Platform: ${platform}
Trading Profile:
- Win Rate: ${(metrics.winLossRatio * 100).toFixed(1)}%
- Average Return: $${metrics.averageROI.toFixed(2)}
- Total Trades: ${metrics.totalTrades}

Please provide:
1. Platform-specific tips based on the trader's performance metrics
2. Recommended tools that match their trading style
3. Curated learning resources for their skill level
4. Advanced platform features they should utilize
5. Risk management features specific to this platform
6. Integration tips with other tools

Important:
- Response must be valid JSON matching the structure above
- Each section should have 2-4 detailed items
- Focus on actionable, platform-specific advice
- Tailor recommendations to the trader's experience level
- Include specific examples and use cases`;
}