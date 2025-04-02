import React, { useState, useEffect } from 'react';
import { AlertCircle, Lightbulb } from 'lucide-react';
import { AIService } from '../../lib/gemini/aiService';
import { TradingMetrics, TradeData, AIResponse } from '../../lib/gemini/types';
import InsightTabs from './InsightTabs';
import AILoader from '../common/AILoader';

interface AIMentorSectionProps {
  metrics: TradingMetrics;
  recentTrades: TradeData[];
}

export default function AIMentorSection({ metrics, recentTrades }: AIMentorSectionProps) {
  const [insights, setInsights] = useState<AIResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchInsights() {
      if (!metrics || !recentTrades.length) return;
      
      setLoading(true);
      setError(null);
      try {
        const result = await AIService.getDashboardInsights(metrics, recentTrades);
        setInsights(result);
      } catch (err) {
        setError('Failed to get AI insights. Please try again later.');
      } finally {
        setLoading(false);
      }
    }

    fetchInsights();
  }, [metrics, recentTrades]);

  if (loading) {
    return <AILoader message="AI Mentor is analyzing your trading patterns..." />;
  }

  if (error) {
    return (
      <div className="p-6 bg-red-50 rounded-xl flex items-start">
        <AlertCircle className="h-5 w-5 text-red-500 mr-2 mt-0.5 flex-shrink-0" />
        <p className="text-red-700">{error}</p>
      </div>
    );
  }

  if (!insights) return null;

  return (
    <div className="space-y-6">
      <div className="flex items-center">
        <Lightbulb className="h-6 w-6 text-blue-600 mr-2" />
        <h2 className="text-xl font-semibold">AI Mentor Insights</h2>
      </div>
      
      <InsightTabs insights={insights} />
    </div>
  );
}