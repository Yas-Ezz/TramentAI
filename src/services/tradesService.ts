import { supabase } from '../lib/supabase/connectionManager';
import { DatabaseError } from '../lib/supabase/errorHandler';
import { Trade, PerformanceMetrics } from '../types';

class TradesService {
  private async ensureConnection() {
    try {
      const { data, error } = await supabase
        .from('trades')
        .select('id')
        .limit(1);

      if (error) throw error;
      return true;
    } catch (error) {
      throw new DatabaseError('Database connection failed', undefined, error);
    }
  }

  async createTrade(data: {
    userId: string;
    date: string;
    asset: string;
    entryPrice: number;
    exitPrice: number;
    profitLoss: number;
  }): Promise<void> {
    await this.ensureConnection();

    try {
      const { error } = await supabase.from('trades').insert([{
        user_id: data.userId,
        date: data.date,
        asset: data.asset,
        entry_price: data.entryPrice,
        exit_price: data.exitPrice,
        profit_loss: data.profitLoss,
      }]);

      if (error) throw error;
    } catch (error) {
      throw new DatabaseError('Failed to create trade', undefined, error);
    }
  }

  async getUserTrades(userId: string): Promise<Trade[]> {
    await this.ensureConnection();

    try {
      const { data, error } = await supabase
        .from('trades')
        .select('*')
        .eq('user_id', userId)
        .order('date', { ascending: false });

      if (error) throw error;
      return data || [];
    } catch (error) {
      throw new DatabaseError('Failed to fetch trades', undefined, error);
    }
  }

  async getPerformanceMetrics(userId: string): Promise<PerformanceMetrics> {
    try {
      const trades = await this.getUserTrades(userId);
      
      if (trades.length === 0) {
        return {
          winLossRatio: 0,
          averageROI: 0,
          bestTrade: 0,
          worstTrade: 0,
          totalTrades: 0
        };
      }

      const winningTrades = trades.filter(trade => trade.profit_loss > 0);
      const winLossRatio = winningTrades.length / trades.length;
      const totalProfitLoss = trades.reduce((sum, trade) => sum + trade.profit_loss, 0);
      const averageROI = totalProfitLoss / trades.length;
      const bestTrade = Math.max(...trades.map(trade => trade.profit_loss));
      const worstTrade = Math.min(...trades.map(trade => trade.profit_loss));

      return {
        winLossRatio,
        averageROI,
        bestTrade,
        worstTrade,
        totalTrades: trades.length
      };
    } catch (error) {
      throw new DatabaseError('Failed to calculate performance metrics', undefined, error);
    }
  }

  async getPerformanceTrend(userId: string): Promise<{ date: string; value: number; }[]> {
    try {
      const trades = await this.getUserTrades(userId);
      
      if (trades.length === 0) return [];

      const monthlyPerformance = trades.reduce((acc, trade) => {
        const month = trade.date.substring(0, 7); // Format: YYYY-MM
        acc[month] = (acc[month] || 0) + trade.profit_loss;
        return acc;
      }, {} as Record<string, number>);

      return Object.entries(monthlyPerformance)
        .map(([date, value]) => ({ date, value }))
        .sort((a, b) => a.date.localeCompare(b.date));
    } catch (error) {
      throw new DatabaseError('Failed to calculate performance trend', undefined, error);
    }
  }
}

export const tradesService = new TradesService();