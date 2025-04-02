import React from 'react';
import { useNavigate } from 'react-router-dom';
import Logo from '../common/Logo';

const PAYPAL_ME_LINK = 'https://paypal.me/ilyasezzahrioui?country.x=MA&locale.x=en_US';
const MONTHLY_PRICE = 14.99;

export default function PayPalSubscriptionFlow() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-900 to-gray-900 px-4">
      <div className="max-w-md w-full space-y-8 bg-white p-10 rounded-xl shadow-xl">
        <div className="text-center">
          <div className="flex justify-center">
            <Logo className="text-blue-600" size="lg" />
          </div>
          <h2 className="mt-6 text-3xl font-bold text-gray-900">
            Monthly Subscription Required
          </h2>
          <p className="mt-4 text-gray-600">
            To continue using TramentAI, please complete your monthly subscription payment.
          </p>
        </div>

        <div className="mt-8">
          <div className="bg-gray-50 p-6 rounded-lg mb-8">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Subscription Details</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <span className="h-6 w-6 flex items-center justify-center rounded-full bg-blue-100 text-blue-600 flex-shrink-0">✓</span>
                <span className="ml-3 text-gray-600">Full access to AI trading insights</span>
              </li>
              <li className="flex items-start">
                <span className="h-6 w-6 flex items-center justify-center rounded-full bg-blue-100 text-blue-600 flex-shrink-0">✓</span>
                <span className="ml-3 text-gray-600">Performance analytics</span>
              </li>
              <li className="flex items-start">
                <span className="h-6 w-6 flex items-center justify-center rounded-full bg-blue-100 text-blue-600 flex-shrink-0">✓</span>
                <span className="ml-3 text-gray-600">Platform optimization tools</span>
              </li>
            </ul>
            
            <div className="mt-6 p-4 bg-blue-50 rounded-lg">
              <p className="text-blue-800 font-medium">Monthly Subscription: ${MONTHLY_PRICE}</p>
              <p className="text-sm text-blue-600 mt-1">Payment required every month to maintain access</p>
            </div>
          </div>

          <a
            href={PAYPAL_ME_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Pay with PayPal
          </a>
          
          <button
            onClick={() => navigate('/')}
            className="mt-4 w-full text-sm text-gray-500 hover:text-gray-700"
          >
            Maybe later
          </button>

          <p className="mt-6 text-sm text-gray-500 text-center">
            After payment, please contact support to activate your subscription.
            Your access will be granted within 24 hours.
          </p>
        </div>
      </div>
    </div>
  );
}