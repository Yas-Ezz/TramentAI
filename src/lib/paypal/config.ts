// PayPal configuration
export const PAYPAL_CONFIG = {
  "client-id": import.meta.env.VITE_PAYPAL_CLIENT_ID,
  currency: "USD",
  intent: "subscription",
  vault: true,
  components: "buttons",
  "disable-funding": "credit,card"
} as const;

export const SUBSCRIPTION_PLAN = {
  monthly_price: 14.99,
  trial_days: 7
} as const;