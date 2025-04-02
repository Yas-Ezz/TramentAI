import React from 'react';
import { Link } from 'react-router-dom';
import Logo from '../common/Logo';

export default function Footer() {
  return (
    <footer className="bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center mb-8 md:mb-0">
            <Logo className="text-blue-500 mr-3" size="sm" />
            <span className="text-white font-semibold">TramentAI</span>
          </div>
          <nav className="flex flex-wrap justify-center gap-8">
            <Link to="/terms" className="text-gray-400 hover:text-white transition-colors">
              Terms & Conditions
            </Link>
            <Link to="/privacy" className="text-gray-400 hover:text-white transition-colors">
              Privacy Policy
            </Link>
            <Link to="/faq" className="text-gray-400 hover:text-white transition-colors">
              FAQ
            </Link>
          </nav>
        </div>
        <div className="mt-8 pt-8 border-t border-gray-800 text-center">
          <p className="text-gray-400">
            © {new Date().getFullYear()} TramentAI. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}