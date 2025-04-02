import React from 'react';
import { ExternalLink, Wrench, BookOpen } from 'lucide-react';

interface InsightListProps {
  items: string[];
  type?: 'default' | 'tools' | 'resources';
}

export default function InsightList({ items, type = 'default' }: InsightListProps) {
  const renderContent = (content: string) => {
    const linkRegex = /\[([^\]]+)\]\(([^)]+)\)/g;
    const parts = content.split(linkRegex);
    
    return parts.map((part, index) => {
      if (index % 3 === 1) { // Link text
        const url = parts[index + 1];
        return (
          <a
            key={index}
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 px-3 py-1 bg-blue-50 text-blue-600 rounded-md hover:bg-blue-100 transition-colors"
          >
            {type === 'tools' ? <Wrench className="h-4 w-4" /> : <BookOpen className="h-4 w-4" />}
            {part}
            <ExternalLink className="h-3 w-3" />
          </a>
        );
      }
      return index % 3 === 2 ? null : part; // Skip URLs, show other text
    });
  };

  const getBulletStyle = () => {
    switch (type) {
      case 'tools':
        return 'bg-purple-600';
      case 'resources':
        return 'bg-green-600';
      default:
        return 'bg-blue-600';
    }
  };

  return (
    <ul className="space-y-3">
      {items.map((item, i) => (
        <li key={i} className="flex items-start gap-3 text-gray-700">
          <span className={`w-2 h-2 mt-2 rounded-full ${getBulletStyle()} flex-shrink-0`} />
          <span className="flex-1 flex flex-wrap gap-2">{renderContent(item)}</span>
        </li>
      ))}
    </ul>
  );
}