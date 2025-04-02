import React from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { Brain, LineChart, Shield, Clock } from 'lucide-react';
import Logo from '../components/common/Logo';
import FeatureCard from '../components/landing/FeatureCard';
import PricingSection from '../components/landing/PricingSection';
import Footer from '../components/landing/Footer';

export default function Landing() {
  const [searchParams] = useSearchParams();
  const subscriptionRequired = searchParams.get('subscription') === 'required';

  const features = [
    {
      icon: Brain,
      title: 'AI-Powered Insights',
      description: 'Get personalized trading recommendations and market analysis from our advanced AI system.'
    },
    {
      icon: LineChart,
      title: 'Performance Tracking',
      description: 'Monitor your trading performance with detailed analytics and actionable insights.'
    },
    {
      icon: Shield,
      title: 'Risk Management',
      description: 'Stay protected with intelligent risk assessment and portfolio management tools.'
    },
    {
      icon: Clock,
      title: 'Real-time Analysis',
      description: 'Receive instant market updates and trading opportunities as they happen.'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-gray-900/90 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <Logo className="text-blue-500" size="md" />
              <span className="ml-2 text-xl font-bold text-white">TramentAI</span>
            </div>
            <div className="flex items-center gap-4">
              <Link
                to="/auth"
                className="text-gray-300 hover:text-white transition-colors"
              >
                Sign In
              </Link>
              <Link
                to="/auth?signup=true"
                className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
              >
                Sign Up
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {subscriptionRequired && (
        <div className="max-w-3xl mx-auto px-4 pt-24">
          <div className="bg-yellow-900/50 text-yellow-200 p-4 rounded-lg text-center">
            Please subscribe to access the dashboard
          </div>
        </div>
      )}

      {/* Hero Section */}
      <header className="pt-32 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-6">
            Unlock Your Trading Potential with TramentAI
          </h1>
          <p className="text-xl text-gray-300 mb-8">
            The smarter way to trade. Let TramentAI guide you to success with personalized AI-driven insights.
          </p>
        </div>
      </header>

      {/* Features Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <FeatureCard
                key={index}
                icon={feature.icon}
                title={feature.title}
                description={feature.description}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-blue-600/10">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-white mb-12">How TramentAI Helps Traders</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            {[
              'Boost trading confidence with AI-backed decisions',
              'Save time with automated analysis and insights',
              'Maintain consistency with data-driven strategies',
              'Reduce risks with smart portfolio management'
            ].map((benefit, index) => (
              <div key={index} className="bg-gray-800/50 rounded-lg p-6">
                <p className="text-gray-300">{benefit}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <PricingSection />

      {/* Footer */}
      <Footer />
    </div>
  );
}