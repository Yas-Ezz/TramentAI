import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import PaymentProvider from './components/subscription/PaymentProvider';
import Layout from './components/Layout';
import Landing from './pages/Landing';
import Auth from './pages/Auth';
import Dashboard from './pages/Dashboard';
import Upload from './pages/Upload';
import PlatformOptimization from './pages/PlatformOptimization';
import PrivateRoute from './components/auth/PrivateRoute';

export default function App() {
  return (
    <AuthProvider>
      <PaymentProvider>
        <BrowserRouter>
          <Routes>
            {/* Public routes */}
            <Route path="/" element={<Landing />} />
            <Route path="/auth" element={<Auth />} />
            
            {/* Protected routes */}
            <Route element={<PrivateRoute />}>
              <Route element={<Layout />}>
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/upload" element={<Upload />} />
                <Route path="/platform-optimization" element={<PlatformOptimization />} />
              </Route>
            </Route>
          </Routes>
        </BrowserRouter>
      </PaymentProvider>
    </AuthProvider>
  );
}