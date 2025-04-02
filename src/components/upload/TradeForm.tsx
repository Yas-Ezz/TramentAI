import React from 'react';
import { TradeFormData } from '../../types';

interface TradeFormProps {
  formData: TradeFormData;
  loading: boolean;
  onSubmit: (e: React.FormEvent) => Promise<void>;
  onChange: (field: keyof TradeFormData, value: string) => void;
}

export default function TradeForm({ formData, loading, onSubmit, onChange }: TradeFormProps) {
  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h2 className="text-xl font-semibold mb-4">Manual Trade Entry</h2>
      <form onSubmit={onSubmit} className="space-y-4">
        <div>
          <label htmlFor="date" className="block text-sm font-medium text-gray-700">
            Date
          </label>
          <input
            type="date"
            id="date"
            required
            value={formData.date}
            onChange={(e) => onChange('date', e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>

        <div>
          <label htmlFor="asset" className="block text-sm font-medium text-gray-700">
            Asset
          </label>
          <input
            type="text"
            id="asset"
            required
            value={formData.asset}
            onChange={(e) => onChange('asset', e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            placeholder="e.g., AAPL"
          />
        </div>

        <div>
          <label htmlFor="entryPrice" className="block text-sm font-medium text-gray-700">
            Entry Price
          </label>
          <input
            type="number"
            id="entryPrice"
            required
            step="0.01"
            value={formData.entryPrice}
            onChange={(e) => onChange('entryPrice', e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>

        <div>
          <label htmlFor="exitPrice" className="block text-sm font-medium text-gray-700">
            Exit Price
          </label>
          <input
            type="number"
            id="exitPrice"
            required
            step="0.01"
            value={formData.exitPrice}
            onChange={(e) => onChange('exitPrice', e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>

        <div>
          <label htmlFor="profitLoss" className="block text-sm font-medium text-gray-700">
            Profit/Loss
          </label>
          <input
            type="number"
            id="profitLoss"
            required
            step="0.01"
            value={formData.profitLoss}
            onChange={(e) => onChange('profitLoss', e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full inline-flex justify-center items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
        >
          Save Trade
        </button>
      </form>
    </div>
  );
}