import React from 'react';
import { LucideIcon } from 'lucide-react';

interface FeatureCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
}

export default function FeatureCard({ icon: Icon, title, description }: FeatureCardProps) {
  return (
    <div className="bg-gray-800/50 rounded-lg p-8 transition-transform hover:scale-105">
      <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-blue-600/20 mb-6 mx-auto">
        <Icon className="h-6 w-6 text-blue-500" />
      </div>
      <h3 className="text-xl font-semibold text-white text-center mb-4">{title}</h3>
      <p className="text-gray-300 text-center">{description}</p>
    </div>
  );
}