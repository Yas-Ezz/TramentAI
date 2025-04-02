import { createClient } from '@supabase/supabase-js';
import type { Database } from './database.types';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient<Database>(supabaseUrl, supabaseKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true
  },
  global: {
    headers: {
      'x-application-name': 'ai-mentor-trading'
    }
  },
  db: {
    schema: 'public'
  }
});

// Connection state management
let isConnected = false;

export async function checkConnection(): Promise<boolean> {
  try {
    const { data, error } = await supabase
      .from('profiles')
      .select('id')
      .limit(1);
    
    if (error) throw error;
    isConnected = true;
    return true;
  } catch (error) {
    console.error('Supabase connection error:', error);
    isConnected = false;
    return false;
  }
}

export function getConnectionStatus(): boolean {
  return isConnected;
}