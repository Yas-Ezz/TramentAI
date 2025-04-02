import React from 'react';
import { AlertCircle, CheckCircle, RefreshCw } from 'lucide-react';
import { useSupabaseConnection } from '../../hooks/useSupabaseConnection';

export default function ConnectionStatus() {
  const { isConnected, isChecking, error, checkConnection } = useSupabaseConnection();

  if (isChecking) {
    return (
      <div className="flex items-center gap-2 text-gray-600">
        <RefreshCw className="h-4 w-4 animate-spin" />
        <span className="text-sm">Checking connection...</span>
      </div>
    );
  }

  if (!isConnected || error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-4">
        <div className="flex items-start gap-2">
          <AlertCircle className="h-5 w-5 text-red-500 mt-0.5" />
          <div className="flex-1">
            <h3 className="text-sm font-medium text-red-800">Connection Error</h3>
            <p className="mt-1 text-sm text-red-700">{error || 'Unable to connect to the database'}</p>
            <button
              onClick={() => checkConnection()}
              className="mt-2 text-sm text-red-600 hover:text-red-500 inline-flex items-center gap-1"
            >
              <RefreshCw className="h-4 w-4" />
              Try again
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-2 text-green-600">
      <CheckCircle className="h-4 w-4" />
      <span className="text-sm">Connected</span>
    </div>
  );
}