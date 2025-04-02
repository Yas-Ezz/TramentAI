import { supabase } from '../supabase';
import { PayPalSubscriptionResponse } from './types';
import { MONTHLY_PRICE } from './config';

export async function createSubscription(userId: string): Promise<string> {
  try {
    const { data: { subscription_url }, error } = await supabase.functions.invoke('create-paypal-subscription', {
      body: { 
        price: MONTHLY_PRICE,
        userId,
        trial_days: 7
      }
    });

    if (error) throw error;
    return subscription_url;
  } catch (error) {
    console.error('PayPal subscription error:', error);
    throw error;
  }
}

export async function handleSubscriptionApproval(subscriptionId: string, userId: string) {
  try {
    const { error } = await supabase.functions.invoke('activate-paypal-subscription', {
      body: { 
        subscriptionId,
        userId
      }
    });

    if (error) throw error;
    return true;
  } catch (error) {
    console.error('Subscription activation error:', error);
    throw error;
  }
}