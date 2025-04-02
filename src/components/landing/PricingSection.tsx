import React from 'react';
import { Check } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function PricingSection() {
  const features = [
    'AI-powered trading insights',
    'Real-time market analysis',
    'Performance tracking',
    'Risk management tools',
    'Portfolio optimization',
    'Priority support'
  ];

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8" id="pricing">
      <div className="max-w-3xl mx-auto text-center">
        <h2 className="text-3xl font-bold text-white mb-12">Simple, Transparent Pricing</h2>
        
        <div className="bg-gray-800/50 rounded-2xl p-8">
          <div className="mb-8">
            <h3 className="text-2xl font-bold text-white mb-2">Pro Plan</h3>
            <div className="flex justify-center items-baseline mb-4">
              <span className="text-5xl font-extrabold text-white">$14.99</span>
              <span className="text-xl text-gray-400 ml-1">/month</span>
            </div>
            <p className="text-blue-400">7-day free trial</p>
          </div>

          <ul className="space-y-4 mb-8">
            {features.map((feature, index) => (
              <li key={index} className="flex items-center justify-center text-gray-300">
                <Check className="h-5 w-5 text-blue-500 mr-2 flex-shrink-0" />
                {feature}
              </li>
            ))}
          </ul>

          <Link
            to="/auth?signup=true"
            className="block w-full bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors text-center"
          >
            Start Free Trial
          </Link>
        </div>
      </div>
    </section>
  );
}