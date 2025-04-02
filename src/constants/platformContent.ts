interface Resource {
  title: string;
  url: string;
}

interface Tool {
  name: string;
  description: string;
}

export const PLATFORM_TIPS: Record<string, string> = {
  NinjaTrader: 'Use NinjaScript to backtest your strategies effectively.',
  cTrader: 'Leverage cAlgo for custom indicator development.',
  TradingView: 'Utilize Pine Script for creating custom indicators and strategies.',
  MetaTrader: 'Optimize your trading robots using MetaEditor for better results.',
};

export const PLATFORM_RESOURCES: Record<string, Resource[]> = {
  NinjaTrader: [
    { title: 'Getting Started with NinjaScript', url: '#' },
    { title: 'Advanced Backtesting Guide', url: '#' },
    { title: 'Market Analysis Tools', url: '#' },
  ],
  cTrader: [
    { title: 'cAlgo Development Basics', url: '#' },
    { title: 'Custom Indicator Creation', url: '#' },
    { title: 'Automated Trading Setup', url: '#' },
  ],
  TradingView: [
    { title: 'Pine Script Tutorial', url: '#' },
    { title: 'Chart Pattern Recognition', url: '#' },
    { title: 'Community Scripts Guide', url: '#' },
  ],
  MetaTrader: [
    { title: 'Expert Advisor Development', url: '#' },
    { title: 'MetaEditor Fundamentals', url: '#' },
    { title: 'Backtesting Strategies', url: '#' },
  ],
};

export const PLATFORM_TOOLS: Record<string, Tool[]> = {
  NinjaTrader: [
    { name: 'Strategy Analyzer', description: 'Backtest and optimize your trading strategies' },
    { name: 'Market Analyzer', description: 'Real-time market scanning and filtering' },
  ],
  cTrader: [
    { name: 'cBot', description: 'Automated trading robot development' },
    { name: 'cAlgo', description: 'Custom indicator and strategy creation' },
  ],
  TradingView: [
    { name: 'Screener', description: 'Find trading opportunities across markets' },
    { name: 'Script Editor', description: 'Create and modify trading indicators' },
  ],
  MetaTrader: [
    { name: 'Strategy Tester', description: 'Test and optimize Expert Advisors' },
    { name: 'Market Scanner', description: 'Find trading opportunities in real-time' },
  ],
};