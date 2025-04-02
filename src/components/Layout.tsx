import React from 'react';
import { Outlet } from 'react-router-dom';
import Navigation from './navigation/Navigation';
import ConnectionStatus from './common/ConnectionStatus';

export default function Layout() {
  return (
    <div className="flex min-h-screen bg-gray-100">
      <Navigation />
      <main className="flex-1 ml-64 p-8">
        <div className="mb-4">
          <ConnectionStatus />
        </div>
        <Outlet />
      </main>
    </div>
  );
}