import React from 'react';
import { usePlatformStore } from '../../stores/platformStore';
import { PLATFORM_TIPS } from '../../constants/platformContent';

export default function PlatformTips() {
  const { selectedPlatforms } = usePlatformStore();

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h2 className="text-xl font-semibold mb-4">Platform-Specific Tips</h2>
      
      <div className="space-y-6">
        {selectedPlatforms.map(platform => (
          <div key={platform} className="p-4 bg-gray-50 rounded-lg">
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              {platform} Tips
            </h3>
            <p className="text-gray-600">
              {PLATFORM_TIPS[platform] || `Optimize your trading experience with ${platform}.`}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}