import React, { useState, useEffect } from 'react';
import { AlertCircle } from 'lucide-react';
import { AIService } from '../../lib/gemini/aiService';
import { TradingMetrics, AIResponse } from '../../lib/gemini/types';
import InsightSection from '../insights/InsightSection';
import ErrorBoundary from '../common/ErrorBoundary';
import AILoader from '../common/AILoader';

interface AIPlatformContentProps {
  platform: string;
  metrics: TradingMetrics;
}

export default function AIPlatformContent({ platform, metrics }: AIPlatformContentProps) {
  const [insights, setInsights] = useState<AIResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [retryCount, setRetryCount] = useState(0);

  useEffect(() => {
    let mounted = true;

    async function fetchContent() {
      if (!platform || !metrics) return;

      setLoading(true);
      setError(null);

      try {
        const result = await AIService.getPlatformContent(platform, metrics);
        if (mounted && result?.sections?.length) {
          setInsights(result);
        } else {
          throw new Error('Invalid response format');
        }
      } catch (err) {
        if (mounted) {
          const errorMessage = err instanceof Error ? err.message : 'Failed to load platform content';
          setError(errorMessage);
          
          if (retryCount < 2 && errorMessage.includes('JSON')) {
            setRetryCount(prev => prev + 1);
            setTimeout(fetchContent, 1000);
          }
        }
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    }

    fetchContent();

    return () => {
      mounted = false;
    };
  }, [platform, metrics, retryCount]);

  if (loading) {
    return <AILoader message={`Analyzing ${platform} optimization opportunities...`} />;
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-start gap-2">
        <AlertCircle className="h-5 w-5 text-red-500 flex-shrink-0 mt-0.5" />
        <div>
          <p className="text-red-700">{error}</p>
          {retryCount > 0 && (
            <p className="text-sm text-red-600 mt-1">
              Retrying... ({retryCount}/2)
            </p>
          )}
        </div>
      </div>
    );
  }

  if (!insights?.sections?.length) return null;

  return (
    <ErrorBoundary>
      <div className="space-y-4">
        {insights.sections.map((section, index) => (
          <InsightSection
            key={`${platform}-${index}-${section.title}`}
            title={section.title}
            content={section.content}
            type={section.type}
          />
        ))}
      </div>
    </ErrorBoundary>
  );
}