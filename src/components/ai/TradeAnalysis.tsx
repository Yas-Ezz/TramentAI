import React, { useState, useEffect } from 'react';
import { AlertCircle } from 'lucide-react';
import { getTradeAnalysis } from '../../lib/gemini';

interface TradeAnalysisProps {
  tradeData: {
    asset: string;
    entryPrice: number;
    exitPrice: number;
    profitLoss: number;
  };
}

export default function TradeAnalysis({ tradeData }: TradeAnalysisProps) {
  const [analysis, setAnalysis] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchAnalysis() {
      setLoading(true);
      setError(null);
      try {
        const result = await getTradeAnalysis(tradeData);
        setAnalysis(result);
      } catch (err) {
        setError('Failed to get trade analysis. Please try again later.');
      } finally {
        setLoading(false);
      }
    }

    if (tradeData) {
      fetchAnalysis();
    }
  }, [tradeData]);

  if (loading) {
    return (
      <div className="animate-pulse p-4 bg-gray-50 rounded-lg">
        <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
        <div className="h-4 bg-gray-200 rounded w-1/2"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 bg-red-50 rounded-lg flex items-start">
        <AlertCircle className="h-5 w-5 text-red-500 mr-2 mt-0.5" />
        <p className="text-red-700">{error}</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h2 className="text-xl font-semibold mb-4">AI Trade Analysis</h2>
      <div className="prose prose-blue max-w-none">
        {analysis.split('\n').map((line, index) => (
          <p key={index} className="mb-2">{line}</p>
        ))}
      </div>
    </div>
  );
}