import React from 'react';
import { PayPalButtons, usePayPalScriptReducer } from "@paypal/react-paypal-js";
import { usePayPalSubscription } from '../../lib/paypal';
import { SUBSCRIPTION_PLAN } from '../../lib/paypal';

export default function PayPalButton() {
  const [{ isInitial, isPending }] = usePayPalScriptReducer();
  const { error, loading, handleCreateSubscription, handleApprove } = usePayPalSubscription();

  if (isInitial || isPending || loading) {
    return (
      <div className="flex items-center justify-center p-4">
        <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600" />
      </div>
    );
  }

  return (
    <div className="w-full max-w-md">
      {error && (
        <div className="mb-4 p-3 bg-red-50 text-red-700 rounded-md text-sm">
          {error}
        </div>
      )}
      
      <PayPalButtons
        style={{ layout: "vertical" }}
        createSubscription={handleCreateSubscription}
        onApprove={(data) => handleApprove(data.subscriptionID)}
        onError={(err) => console.error('PayPal error:', err)}
      />
      
      <p className="mt-2 text-sm text-gray-500 text-center">
        You will be charged ${SUBSCRIPTION_PLAN.monthly_price}/month after the {SUBSCRIPTION_PLAN.trial_days}-day free trial
      </p>
    </div>
  );
}