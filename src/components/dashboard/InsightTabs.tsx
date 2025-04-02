import React, { useState } from 'react';
import { 
  LineChart, 
  TrendingUp, 
  AlertTriangle, 
  CheckCircle, 
  ArrowRight,
  BookOpen
} from 'lucide-react';
import { AIResponse } from '../../lib/gemini/types';

interface InsightTabsProps {
  insights: AIResponse;
}

export default function InsightTabs({ insights }: InsightTabsProps) {
  const [activeTab, setActiveTab] = useState('overview');

  const tabs = [
    { id: 'overview', label: 'Overview', icon: LineChart },
    { id: 'strengths', label: 'Strengths', icon: CheckCircle },
    { id: 'improvements', label: 'Improvements', icon: AlertTriangle },
    { id: 'actions', label: 'Next Steps', icon: ArrowRight },
  ];

  const getTabContent = (tabId: string) => {
    const section = insights.sections.find(s => {
      switch (tabId) {
        case 'overview':
          return s.title.toLowerCase().includes('overview');
        case 'strengths':
          return s.title.toLowerCase().includes('strength');
        case 'improvements':
          return s.title.toLowerCase().includes('improvement');
        case 'actions':
          return s.title.toLowerCase().includes('next steps');
        default:
          return false;
      }
    });

    if (!section) return null;

    return (
      <div className="space-y-4">
        {section.content.map((item, index) => (
          <div key={index} className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg">
            <div className="w-1.5 h-1.5 rounded-full bg-blue-600 mt-2" />
            <div className="flex-1">
              <p className="text-gray-700">{item.text}</p>
              {item.type === 'link' && (
                <a
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 mt-2 text-sm text-blue-600 hover:text-blue-700"
                >
                  <BookOpen className="h-4 w-4" />
                  Learn more
                </a>
              )}
            </div>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="bg-white rounded-xl shadow-sm">
      <div className="border-b">
        <div className="flex overflow-x-auto">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-6 py-4 border-b-2 font-medium transition-colors whitespace-nowrap ${
                activeTab === tab.id
                  ? 'border-blue-600 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              <tab.icon className="h-5 w-5" />
              {tab.label}
            </button>
          ))}
        </div>
      </div>
      
      <div className="p-6">
        {getTabContent(activeTab)}
      </div>
    </div>
  );
}