import React, { useEffect, useState } from 'react';
import { PayPalScriptProvider } from "@paypal/react-paypal-js";
import { PAYPAL_CONFIG } from '../../lib/paypal/config';

interface PaymentProviderProps {
  children: React.ReactNode;
}

export default function PaymentProvider({ children }: PaymentProviderProps) {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    // Ensure client ID is available before rendering PayPal
    if (PAYPAL_CONFIG["client-id"]) {
      setReady(true);
    } else {
      console.error('PayPal client ID is not configured');
    }
  }, []);

  if (!ready) {
    return <>{children}</>;
  }

  return (
    <PayPalScriptProvider options={PAYPAL_CONFIG}>
      {children}
    </PayPalScriptProvider>
  );
}