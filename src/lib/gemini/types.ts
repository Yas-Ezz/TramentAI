export interface InsightContent {
  type: 'text' | 'link';
  text: string;
  url?: string;
  description?: string;
}

export interface InsightSection {
  title: string;
  content: InsightContent[];
  type?: 'default' | 'tools' | 'resources';
}

export interface AIResponse {
  sections: InsightSection[];
}

export interface TradeData {
  asset: string;
  entryPrice: number;
  exitPrice: number;
  profitLoss: number;
  date: string;
}

export interface TradingMetrics {
  winLossRatio: number;
  averageROI: number;
  bestTrade: number;
  worstTrade: number;
  totalTrades: number;
}