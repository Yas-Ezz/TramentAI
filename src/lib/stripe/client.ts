import { stripePromise, STRIPE_PRICE_ID } from './config';
import { supabase } from '../supabase';

export async function createCheckoutSession(userId: string) {
  try {
    const { data: { session_url }, error } = await supabase.functions.invoke('create-checkout-session', {
      body: { 
        priceId: STRIPE_PRICE_ID,
        userId,
        trial_days: 7
      }
    });

    if (error) throw error;
    return session_url;
  } catch (error) {
    console.error('Checkout session error:', error);
    throw error;
  }
}

export async function createPortalSession(userId: string) {
  try {
    const { data: { url }, error } = await supabase.functions.invoke('create-portal-session', {
      body: { userId }
    });

    if (error) throw error;
    return url;
  } catch (error) {
    console.error('Portal session error:', error);
    throw error;
  }
}