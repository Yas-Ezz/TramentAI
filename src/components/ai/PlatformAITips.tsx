import React, { useState, useEffect } from 'react';
import { AlertCircle } from 'lucide-react';
import { getPlatformTips } from '../../lib/gemini';

interface PlatformAITipsProps {
  platform: string;
}

export default function PlatformAITips({ platform }: PlatformAITipsProps) {
  const [tips, setTips] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchTips() {
      setLoading(true);
      setError(null);
      try {
        const result = await getPlatformTips(platform);
        setTips(result);
      } catch (err) {
        setError('Failed to get platform tips. Please try again later.');
      } finally {
        setLoading(false);
      }
    }

    if (platform) {
      fetchTips();
    }
  }, [platform]);

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
      <h2 className="text-xl font-semibold mb-4">AI Platform Tips for {platform}</h2>
      <div className="prose prose-blue max-w-none">
        {tips.split('\n').map((line, index) => (
          <p key={index} className="mb-2">{line}</p>
        ))}
      </div>
    </div>
  );
}