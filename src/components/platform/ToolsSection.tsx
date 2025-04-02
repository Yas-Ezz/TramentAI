import React from 'react';
import { Wrench } from 'lucide-react';
import { usePlatformStore } from '../../stores/platformStore';
import { PLATFORM_TOOLS } from '../../constants/platformContent';

export default function ToolsSection() {
  const { selectedPlatforms } = usePlatformStore();

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h2 className="text-xl font-semibold mb-4">Recommended Tools</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {selectedPlatforms.map(platform => (
          <div key={platform} className="border rounded-lg p-4">
            <h3 className="text-lg font-medium text-gray-900 mb-4">
              Tools for {platform}
            </h3>
            
            <ul className="space-y-3">
              {PLATFORM_TOOLS[platform]?.map((tool, index) => (
                <li key={index} className="flex items-start p-3 bg-gray-50 rounded-lg">
                  <Wrench className="h-5 w-5 text-blue-600 mr-3 mt-0.5" />
                  <div>
                    <h4 className="font-medium text-gray-900">{tool.name}</h4>
                    <p className="text-sm text-gray-600">{tool.description}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}