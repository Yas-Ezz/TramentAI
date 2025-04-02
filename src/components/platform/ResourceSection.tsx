import React from 'react';
import { BookOpen } from 'lucide-react';
import { usePlatformStore } from '../../stores/platformStore';
import { PLATFORM_RESOURCES } from '../../constants/platformContent';

export default function ResourceSection() {
  const { selectedPlatforms } = usePlatformStore();

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h2 className="text-xl font-semibold mb-4">Resources & Tutorials</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {selectedPlatforms.map(platform => (
          <div key={platform} className="border rounded-lg p-4">
            <h3 className="text-lg font-medium text-gray-900 mb-4">
              Resources for {platform}
            </h3>
            
            <div className="space-y-3">
              {PLATFORM_RESOURCES[platform]?.map((resource, index) => (
                <a
                  key={index}
                  href={resource.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <BookOpen className="h-5 w-5 text-blue-600 mr-3" />
                  <span className="text-gray-700">{resource.title}</span>
                </a>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}