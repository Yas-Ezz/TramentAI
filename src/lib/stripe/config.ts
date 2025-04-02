import { loadStripe } from '@stripe/stripe-js';

export const STRIPE_PUBLIC_KEY = 'pk_test_your_key';
export const STRIPE_PRICE_ID = 'price_your_monthly_plan';
export const TRIAL_DAYS = 7;

export const stripePromise = loadStripe(STRIPE_PUBLIC_KEY);