import React from 'react';
import { TrendingUp } from 'lucide-react';

interface LogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  color?: string;
}

export default function Logo({ className = '', size = 'md', color = 'currentColor' }: LogoProps) {
  const getSizeClasses = () => {
    switch (size) {
      case 'sm':
        return 'h-6 w-6';
      case 'lg':
        return 'h-12 w-12';
      default:
        return 'h-8 w-8';
    }
  };

  return (
    <TrendingUp 
      className={`${getSizeClasses()} ${className} transition-transform hover:scale-105`}
      color={color}
    />
  );
}