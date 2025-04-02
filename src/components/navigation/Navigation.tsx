import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { LineChart, Upload, Settings } from 'lucide-react';
import LogoutButton from '../auth/LogoutButton';
import Logo from '../common/Logo';

export default function Navigation() {
  const location = useLocation();
  const isActive = (path: string) => location.pathname === path;

  const navItems = [
    { path: '/dashboard', icon: LineChart, label: 'Dashboard' },
    { path: '/upload', icon: Upload, label: 'Upload Data' },
    { path: '/platform-optimization', icon: Settings, label: 'Platform Optimization' },
  ];

  return (
    <nav className="fixed left-0 top-0 h-full w-64 bg-gray-900 text-white p-4 flex flex-col">
      <div className="mb-8">
        <Link to="/dashboard" className="flex items-center gap-3 mb-2 group">
          <Logo 
            className="text-blue-500 group-hover:text-blue-400 transition-colors" 
            size="md"
          />
          <h1 className="text-2xl font-bold">TramentAI</h1>
        </Link>
        <p className="text-gray-400 text-sm">Your trading companion</p>
      </div>
      
      <div className="space-y-2 flex-1">
        {navItems.map(({ path, icon: Icon, label }) => (
          <Link
            key={path}
            to={path}
            className={`flex items-center space-x-3 p-3 rounded-lg ${
              isActive(path) ? 'bg-blue-600' : 'hover:bg-gray-800'
            }`}
          >
            <Icon size={20} />
            <span>{label}</span>
          </Link>
        ))}
      </div>

      <div className="mt-auto">
        <LogoutButton />
      </div>
    </nav>
  );
}