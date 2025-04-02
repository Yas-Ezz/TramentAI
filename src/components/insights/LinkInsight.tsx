import React from 'react';
import { ExternalLink } from 'lucide-react';

interface LinkInsightProps {
  text: string;
  url: string;
  description?: string;
}

export default function LinkInsight({ text, url, description }: LinkInsightProps) {
  return (
    <div className="flex items-start gap-2">
      <div className="w-1.5 h-1.5 rounded-full bg-blue-600 mt-2 flex-shrink-0" />
      <div>
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 text-blue-600 hover:text-blue-700"
        >
          {text}
          <ExternalLink className="h-3 w-3" />
        </a>
        {description && (
          <p className="mt-1 text-sm text-gray-600">{description}</p>
        )}
      </div>
    </div>
  );
}