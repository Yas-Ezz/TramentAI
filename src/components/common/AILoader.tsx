import React from 'react';
import { Brain, Sparkles, Zap } from 'lucide-react';

interface AILoaderProps {
  message?: string;
}

export default function AILoader({ message = 'AI is analyzing your data...' }: AILoaderProps) {
  return (
    <div className="bg-white rounded-xl shadow-sm p-8">
      <div className="flex flex-col items-center justify-center">
        {/* Animated Brain Icon with Particles */}
        <div className="relative">
          <div className="relative">
            <Brain className="h-12 w-12 text-blue-600 animate-pulse" />
            <Sparkles className="h-6 w-6 text-yellow-400 absolute -top-2 -right-2 animate-bounce" />
            <Zap className="h-5 w-5 text-blue-400 absolute -bottom-1 -left-2 animate-ping" />
          </div>
          
          {/* Animated Rings */}
          <div className="absolute inset-0 -m-4">
            <div className="absolute inset-0 animate-ping-slow rounded-full border-2 border-blue-200 opacity-20"></div>
            <div className="absolute inset-0 -m-2 animate-ping-slower rounded-full border-2 border-blue-100 opacity-10"></div>
          </div>
        </div>
        
        {/* Loading Message */}
        <h3 className="mt-6 text-lg font-medium text-gray-900">{message}</h3>
        
        {/* Animated Dots */}
        <div className="mt-4 flex space-x-2">
          <div className="h-2 w-2 bg-blue-600 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
          <div className="h-2 w-2 bg-blue-600 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
          <div className="h-2 w-2 bg-blue-600 rounded-full animate-bounce"></div>
        </div>
        
        {/* Progress Bar */}
        <div className="mt-6 w-48 h-1 bg-gray-100 rounded-full overflow-hidden">
          <div className="h-full bg-blue-600 rounded-full animate-progress"></div>
        </div>
        
        {/* Status Message */}
        <p className="mt-4 text-sm text-gray-500">
          Generating personalized insights...
        </p>
      </div>
    </div>
  );
}