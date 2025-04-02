import React from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

interface InsightCardProps {
  title: string;
  isExpanded: boolean;
  onToggle: () => void;
  type?: 'default' | 'tools' | 'resources';
  icon?: React.ReactNode;
  children: React.ReactNode;
}

export default function InsightCard({ 
  title, 
  isExpanded, 
  onToggle, 
  type = 'default',
  icon, 
  children 
}: InsightCardProps) {
  const getHeaderStyle = () => {
    switch (type) {
      case 'tools':
        return 'bg-purple-50 hover:bg-purple-100';
      case 'resources':
        return 'bg-green-50 hover:bg-green-100';
      default:
        return 'bg-gray-50 hover:bg-gray-100';
    }
  };

  return (
    <div className="border rounded-lg overflow-hidden bg-white shadow-sm">
      <button
        onClick={onToggle}
        className={`w-full flex items-center justify-between p-4 ${getHeaderStyle()} transition-colors`}
      >
        <div className="flex items-center gap-2">
          {icon}
          <span className="font-medium text-gray-900">{title}</span>
        </div>
        {isExpanded ? (
          <ChevronUp className="h-5 w-5 text-gray-500" />
        ) : (
          <ChevronDown className="h-5 w-5 text-gray-500" />
        )}
      </button>
      
      {isExpanded && (
        <div className="p-4 border-t">{children}</div>
      )}
    </div>
  );
}