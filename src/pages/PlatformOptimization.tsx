import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import PlatformSelector from '../components/platform/PlatformSelector';
import AIPlatformContent from '../components/platform/AIPlatformContent';
import { usePlatformStore } from '../stores/platformStore';
import { tradesService } from '../services/tradesService';

export default function PlatformOptimization() {
  const { user } = useAuth();
  const { selectedPlatforms } = usePlatformStore();
  const [metrics, setMetrics] = React.useState<any>(null);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    async function loadMetrics() {
      if (!user) return;
      try {
        const data = await tradesService.getPerformanceMetrics(user.id);
        setMetrics(data);
      } catch (error) {
        console.error('Failed to load metrics:', error);
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
      </div>
    </div>
  );
}