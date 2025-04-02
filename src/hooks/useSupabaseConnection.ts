import { useState, useEffect } from 'react';
import { connectionManager } from '../lib/supabase/connectionManager';

export function useSupabaseConnection() {
  const [isConnected, setIsConnected] = useState(connectionManager.isConnectionActive());
  const [isChecking, setIsChecking] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const checkConnection = async () => {
    if (isChecking) return;
    
    setIsChecking(true);
    setError(null);
    
    try {
      const connected = await connectionManager.ensureConnection();
      setIsConnected(connected);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to connect to database';
      setError(message);
      setIsConnected(false);
    } finally {
      setIsChecking(false);
    }
  };

  useEffect(() => {
    checkConnection();

    return () => {
      connectionManager.cleanup();
    };
  }, []);

  return {
    isConnected,
    isChecking,
    error,
    checkConnection
  };
}