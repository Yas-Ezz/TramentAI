import React from 'react';

interface TextInsightProps {
  text: string;
}

export default function TextInsight({ text }: TextInsightProps) {
  return (
    <div className="flex items-start gap-2">
      <div className="w-1.5 h-1.5 rounded-full bg-blue-600 mt-2 flex-shrink-0" />
      <p className="text-gray-700">{text}</p>
    </div>
  );
}