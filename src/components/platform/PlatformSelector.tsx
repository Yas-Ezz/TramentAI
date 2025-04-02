import React, { useState } from 'react';
import { Check, ChevronDown } from 'lucide-react';
import { usePlatformStore } from '../../stores/platformStore';
import { TRADING_PLATFORMS } from '../../constants/platforms';

export default function PlatformSelector() {
  const { selectedPlatforms, setSelectedPlatforms } = usePlatformStore();
  const [isOpen, setIsOpen] = useState(false);
  const [otherPlatform, setOtherPlatform] = useState('');

  const handlePlatformToggle = (platform: string) => {
    const newSelection = selectedPlatforms.includes(platform)
      ? selectedPlatforms.filter(p => p !== platform)
      : [...selectedPlatforms, platform];
    setSelectedPlatforms(newSelection);
  };

  const handleOtherPlatformSave = () => {
    if (otherPlatform.trim()) {
      setSelectedPlatforms([...selectedPlatforms, otherPlatform.trim()]);
      setOtherPlatform('');
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h2 className="text-xl font-semibold mb-4">Select Your Trading Platforms</h2>
      
      <div className="relative">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-full flex items-center justify-between p-3 border rounded-lg bg-white"
        >
          <span className="text-gray-700">
            {selectedPlatforms.length 
              ? `${selectedPlatforms.length} Platform${selectedPlatforms.length > 1 ? 's' : ''} Selected`
              : 'Select Platforms'}
          </span>
          <ChevronDown className={`transform transition-transform ${isOpen ? 'rotate-180' : ''}`} />
        </button>

        {isOpen && (
          <div className="absolute z-10 w-full mt-2 bg-white border rounded-lg shadow-lg">
            {TRADING_PLATFORMS.map(platform => (
              <div
                key={platform}
                className="flex items-center justify-between p-3 hover:bg-gray-50 cursor-pointer"
                onClick={() => handlePlatformToggle(platform)}
              >
                <span>{platform}</span>
                {selectedPlatforms.includes(platform) && (
                  <Check className="text-green-500" />
                )}
              </div>
            ))}
            
            <div className="p-3 border-t">
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Other platform..."
                  value={otherPlatform}
                  onChange={(e) => setOtherPlatform(e.target.value)}
                  className="flex-1 p-2 border rounded"
                />
                <button
                  onClick={handleOtherPlatformSave}
                  disabled={!otherPlatform.trim()}
                  className="px-4 py-2 bg-blue-600 text-white rounded disabled:opacity-50"
                >
                  Add
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}