import React, { useEffect, useState } from 'react';
import { LineChart as LucideLineChart, TrendingUp, TrendingDown, DollarSign, Activity } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { useAuth } from '../contexts/AuthContext';
import { tradesService } from '../services/tradesService';
import { PerformanceMetrics, TradeData } from '../types';
import AIMentorSection from '../components/dashboard/AIMentorSection';

const MetricCard = ({ title, value, icon: Icon, trend }: any) => (
  <div className="bg-white p-6 rounded-xl shadow-sm">
    <div className="flex items-center justify-between">
      <div>
        <p className="text-sm text-gray-600">{title}</p>
        <p className="text-2xl font-semibold mt-1">{value}</p>
      </div>
      <div className={`p-3 rounded-full ${
        trend === 'up' ? 'bg-green-100' : trend === 'down' ? 'bg-red-100' : 'bg-blue-100'
      }`}>
        <Icon className={`h-6 w-6 ${
          trend === 'up' ? 'text-green-600' : trend === 'down' ? 'text-red-600' : 'text-blue-600'
        }`} />
      </div>
    </div>
  </div>
);

export default function Dashboard() {
  const { user } = useAuth();
  const [metrics, setMetrics] = useState<PerformanceMetrics | null>(null);
  const [performanceData, setPerformanceData] = useState<any[]>([]);
  const [recentTrades, setRecentTrades] = useState<TradeData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadDashboardData() {
      if (!user) return;

      try {
        const [metricsData, trendData, trades] = await Promise.all([
          tradesService.getPerformanceMetrics(user.id),
          tradesService.getPerformanceTrend(user.id),
          tradesService.getUserTrades(user.id)
        ]);

        setMetrics(metricsData);
        setPerformanceData(trendData);
        setRecentTrades(trades.slice(0, 5)); // Get 5 most recent trades
      } catch (error) {
        console.error('Failed to load dashboard data:', error);
      } finally {
        setLoading(false);
      }
    }

    loadDashboardData();
  }, [user]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600" />
      </div>
    );
  }

  if (!metrics || performanceData.length === 0) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Trading Dashboard</h1>
          <p className="text-gray-600">Monitor your performance and get insights</p>
        </div>
        
        <div className="bg-white p-8 rounded-xl shadow-sm text-center">
          <LucideLineChart className="h-12 w-12 mx-auto text-gray-400 mb-4" />
          <h2 className="text-xl font-semibold text-gray-900 mb-2">No Trading Data Yet</h2>
          <p className="text-gray-600 mb-4">Start by uploading your trading data to see insights and analytics.</p>
          <a
            href="/upload"
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
          >
            Upload Trades
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Trading Dashboard</h1>
        <p className="text-gray-600">Monitor your performance and get insights</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard
          title="Win/Loss Ratio"
          value={`${(metrics.winLossRatio * 100).toFixed(1)}%`}
          icon={Activity}
          trend={metrics.winLossRatio >= 0.5 ? 'up' : 'down'}
        />
        <MetricCard
          title="Average ROI"
          value={`$${metrics.averageROI.toFixed(2)}`}
          icon={TrendingUp}
          trend={metrics.averageROI > 0 ? 'up' : 'down'}
        />
        <MetricCard
          title="Best Trade"
          value={`$${metrics.bestTrade.toFixed(2)}`}
          icon={DollarSign}
          trend="up"
        />
        <MetricCard
          title="Worst Trade"
          value={`$${metrics.worstTrade.toFixed(2)}`}
          icon={TrendingDown}
          trend="down"
        />
      </div>

      <div className="bg-white p-6 rounded-xl shadow-sm">
        <h2 className="text-lg font-semibold mb-4">Performance Trend</h2>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={performanceData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Line 
                type="monotone" 
                dataKey="value" 
                stroke="#3B82F6" 
                strokeWidth={2}
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {metrics.totalTrades > 0 && (
        <AIMentorSection metrics={metrics} recentTrades={recentTrades} />
      )}
    </div>
  );
}