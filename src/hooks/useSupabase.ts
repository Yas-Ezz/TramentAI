import { useState, useEffect } from 'react';
import { checkConnection, getConnectionStatus } from '../lib/supabase';

export function useSupabase() {
  const [isConnected, setIsConnected] = useState(getConnectionStatus());
  const [isChecking, setIsChecking] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const checkSupabaseConnection = async () => {
    setIsChecking(true);
    setError(null);
    try {
      const connected = await checkConnection();
      setIsConnected(connected);
      if (!connected) {
        setError('Unable to connect to the database');
      }
    } catch (err) {
      setError('Failed to check database connection');
      setIsConnected(false);
    } finally {
      setIsChecking(false);
    }
  };

  useEffect(() => {
    checkSupabaseConnection();
  }, []);

  return {
    isConnected,
    isChecking,
    error,
    checkConnection: checkSupabaseConnection
  };
}