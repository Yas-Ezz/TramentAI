import React from 'react';
import { InsightContent } from '../../lib/gemini/types';
import TextInsight from './TextInsight';
import LinkInsight from './LinkInsight';

interface InsightSectionProps {
  title: string;
  content: InsightContent[];
  type?: 'default' | 'tools' | 'resources';
}

export default function InsightSection({ title, content, type = 'default' }: InsightSectionProps) {
  const getBgColor = () => {
    switch (type) {
      case 'tools':
        return 'bg-purple-50';
      case 'resources':
        return 'bg-green-50';
      default:
        return 'bg-gray-50';
    }
  };

  return (
    <div className="rounded-lg border bg-white overflow-hidden">
      <div className={`px-4 py-3 ${getBgColor()} border-b`}>
        <h3 className="font-medium text-gray-900">{title}</h3>
      </div>
      <div className="p-4 space-y-3">
        {content.map((item, index) => (
          <div key={index}>
            {item.type === 'text' ? (
              <TextInsight text={item.text} />
            ) : (
              <LinkInsight
                text={item.text}
                url={item.url!}
                description={item.description}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}