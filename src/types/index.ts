export interface User {
  id: string;
  email: string;
  created_at: string;
}

export interface Profile {
  id: string;
  email: string;
  created_at: string;
  updated_at: string;
}

export interface Trade {
  id: string;
  user_id: string;
  date: string;
  asset: string;
  entry_price: number;
  exit_price: number;
  profit_loss: number;
  created_at: string;
}

export interface TradeFormData {
  date: string;
  asset: string;
  entryPrice: string;
  exitPrice: string;
  profitLoss: string;
}

export interface MessageType {
  type: 'success' | 'error';
  text: string;
}

export interface PerformanceMetrics {
  winLossRatio: number;
  averageROI: number;
  bestTrade: number;
  worstTrade: number;
  totalTrades: number;
}