import React, { useState } from 'react';
import { RefreshCw } from 'lucide-react';
import { usePlatformStore } from '../../stores/platformStore';

export default function SyncSection() {
  const { selectedPlatforms } = usePlatformStore();
  const [syncing, setSyncing] = useState(false);

  const handleSync = () => {
    setSyncing(true);
    setTimeout(() => setSyncing(false), 2000);
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h2 className="text-xl font-semibold mb-4">Platform Sync</h2>
      
      <div className="text-center p-6 bg-gray-50 rounded-lg">
        <RefreshCw className={`h-12 w-12 mx-auto text-blue-600 mb-4 ${
          syncing ? 'animate-spin' : ''
        }`} />
        
        <p className="text-gray-600 mb-4">
          Sync your trading data with {selectedPlatforms.join(' & ')}
        </p>
        
        <button
          onClick={handleSync}
          disabled={syncing}
          className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
        >
          {syncing ? 'Syncing...' : 'Sync My Data'}
        </button>
        
        <p className="mt-4 text-sm text-gray-500">
          Coming Soon! This feature will allow automatic data synchronization with your trading platforms.
        </p>
      </div>
    </div>
  );
}