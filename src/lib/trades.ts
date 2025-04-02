import { tradesService } from '../services/tradesService';
import Papa from 'papaparse';

interface TradeData {
  userId: string;
  date: string;
  asset: string;
  entryPrice: number;
  exitPrice: number;
  profitLoss: number;
}

export async function uploadTrade(data: TradeData) {
  try {
    await tradesService.createTrade(data);
  } catch (error) {
    console.error('Upload trade error:', error);
    throw error;
  }
}

export async function parseCSVFile(file: File): Promise<TradeData[]> {
  return new Promise((resolve, reject) => {
    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: (results) => {
        try {
          const trades = results.data.map((row: any) => ({
            date: row.Date,
            asset: row.Asset,
            entryPrice: parseFloat(row['Entry Price']),
            exitPrice: parseFloat(row['Exit Price']),
            profitLoss: parseFloat(row['Profit/Loss'])
          }));
          resolve(trades as TradeData[]);
        } catch (error) {
          reject(new Error('Invalid CSV format'));
        }
      },
      error: (error) => reject(error)
    });
  });
}

export async function uploadTradesFromCSV(userId: string, file: File) {
  try {
    const trades = await parseCSVFile(file);
    
    // Upload trades sequentially to ensure all succeed
    const results = await Promise.all(
      trades.map(trade => 
        tradesService.createTrade({
          userId,
          date: trade.date,
          asset: trade.asset,
          entryPrice: trade.entryPrice,
          exitPrice: trade.exitPrice,
          profitLoss: trade.profitLoss
        })
      )
    );

    return results.length;
  } catch (error) {
    console.error('Failed to upload trades:', error);
    throw error;
  }
}