import { createClient } from '@supabase/supabase-js';
import type { Database } from '../database.types';

const MAX_RETRIES = 3;
const RETRY_DELAY = 1000;
const CONNECTION_CHECK_INTERVAL = 30000; // 30 seconds

class ConnectionManager {
  private static instance: ConnectionManager;
  private client: ReturnType<typeof createClient<Database>>;
  private isConnected: boolean = false;
  private connectionPromise: Promise<boolean> | null = null;
  private retryCount: number = 0;
  private checkInterval: number | null = null;

  private constructor() {
    const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
    const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

    if (!supabaseUrl || !supabaseKey) {
      throw new Error('Missing Supabase environment variables');
    }

    this.client = createClient<Database>(supabaseUrl, supabaseKey, {
      auth: {
        persistSession: true,
        autoRefreshToken: true,
        detectSessionInUrl: true
      },
      global: {
        headers: {
          'x-application-name': 'trament-ai'
        }
      },
      db: {
        schema: 'public'
      },
      realtime: {
        params: {
          eventsPerSecond: 2
        }
      }
    });

    this.startConnectionCheck();
  }

  private startConnectionCheck() {
    if (this.checkInterval) return;
    
    this.checkInterval = window.setInterval(() => {
      if (!this.isConnected) {
        this.ensureConnection().catch(console.error);
      }
    }, CONNECTION_CHECK_INTERVAL);
  }

  public static getInstance(): ConnectionManager {
    if (!ConnectionManager.instance) {
      ConnectionManager.instance = new ConnectionManager();
    }
    return ConnectionManager.instance;
  }

  public getClient() {
    return this.client;
  }

  public async ensureConnection(): Promise<boolean> {
    if (this.isConnected) {
      return true;
    }

    if (this.connectionPromise) {
      return this.connectionPromise;
    }

    this.connectionPromise = this.tryConnect();
    const result = await this.connectionPromise;
    this.connectionPromise = null;
    return result;
  }

  private async tryConnect(): Promise<boolean> {
    try {
      const { data, error } = await this.client
        .from('profiles')
        .select('id')
        .limit(1)
        .maybeSingle();

      if (error) {
        throw error;
      }

      this.isConnected = true;
      this.retryCount = 0;
      return true;
    } catch (error) {
      console.error('Supabase connection error:', error);
      
      if (this.retryCount < MAX_RETRIES) {
        this.retryCount++;
        await new Promise(resolve => setTimeout(resolve, RETRY_DELAY * this.retryCount));
        return this.tryConnect();
      }

      this.isConnected = false;
      throw new Error('Failed to connect to database after multiple attempts');
    }
  }

  public isConnectionActive(): boolean {
    return this.isConnected;
  }

  public resetConnection(): void {
    this.isConnected = false;
    this.connectionPromise = null;
    this.retryCount = 0;
  }

  public cleanup(): void {
    if (this.checkInterval) {
      clearInterval(this.checkInterval);
      this.checkInterval = null;
    }
  }
}

export const connectionManager = ConnectionManager.getInstance();
export const supabase = connectionManager.getClient();