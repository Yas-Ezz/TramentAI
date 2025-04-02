import React, { useState } from 'react';
import { Navigate, useSearchParams } from 'react-router-dom';
import AuthForm from '../components/auth/AuthForm';
import PayPalSubscriptionFlow from '../components/subscription/PayPalSubscriptionFlow';
import { useAuth } from '../contexts/AuthContext';
import { useSubscription } from '../hooks/useSubscription';
import Logo from '../components/common/Logo';

export default function Auth() {
  const [searchParams] = useSearchParams();
  const { user, loading } = useAuth();
  const { isSubscribed, loading: subscriptionLoading } = useSubscription();
  const [isLogin, setIsLogin] = useState(true);
  
  const requiresSubscription = searchParams.get('subscription') === 'required';

  if (loading || subscriptionLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600" />
      </div>
    );
  }

  // Show subscription flow for authenticated but unsubscribed users
  if (user && !isSubscribed && requiresSubscription) {
    return <PayPalSubscriptionFlow />;
  }

  // Redirect authenticated and subscribed users to dashboard
  if (user && isSubscribed) {
    return <Navigate to="/dashboard" replace />;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-900 to-gray-900 px-4">
      <div className="max-w-md w-full space-y-8 bg-white p-10 rounded-xl shadow-xl">
        <div className="text-center">
          <div className="flex justify-center">
            <Logo className="text-blue-600" size="lg" />
          </div>
          <h2 className="mt-6 text-3xl font-bold text-gray-900">
            Welcome to TramentAI
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Your AI mentor for smarter trading
          </p>
          {requiresSubscription && (
            <div className="mt-4 p-3 bg-yellow-50 text-yellow-800 rounded-md text-sm">
              Please subscribe to access the dashboard
            </div>
          )}
        </div>

        <AuthForm type={isLogin ? 'login' : 'signup'} />

        <div className="text-center">
          <button
            onClick={() => setIsLogin(!isLogin)}
            className="text-sm text-blue-600 hover:text-blue-500"
          >
            {isLogin ? "Don't have an account? Sign up" : "Already have an account? Sign in"}
          </button>
        </div>
      </div>
    </div>
  );
}