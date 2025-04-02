import React, { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import PlatformSelector from './PlatformSelector';
import AIPlatformContent from './AIPlatformContent';
import { usePlatformStore } from '../../stores/platformStore';
import { tradesService } from '../../services/tradesService';
import { TradingMetrics } from '../../lib/gemini/types';

export default function PlatformOptimization() {
  const { user } = useAuth();
  const { selectedPlatforms } = usePlatformStore();
  const [metrics, setMetrics] = useState<TradingMetrics | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadMetrics() {
      if (!user) return;
      
      setLoading(true);
      setError(null);
      
      try {
        const data = await tradesService.getPerformanceMetrics(user.id);
        setMetrics(data);
      } catch (error) {
        console.error('Failed to load metrics:', error);
        setError('Failed to load trading metrics. Please try again.');
      } finally {
        setLoading(false);
      }
    }

    loadMetrics();
  }, [user]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-700">
          {error}
        </div>
      </div>
    );
  }

  if (!metrics) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 text-yellow-700">
          No trading data available. Please upload some trades first.
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Platform Optimization Hub</h1>
      
      <div className="space-y-8">
        <PlatformSelector />
        
        {selectedPlatforms.map(platform => (
          <div key={platform} className="mt-8">
            <h2 className="text-2xl font-semibold mb-6">{platform} Insights</h2>
            <AIPlatformContent platform={platform} metrics={metrics} />
          </div>
        ))}

        {selectedPlatforms.length === 0 && (
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-blue-700">
            Select a trading platform above to see AI-powered insights and recommendations.
          </div>
        )}
      </div>
    </div>
  );
}