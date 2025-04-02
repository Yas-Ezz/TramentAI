import { supabase } from '../supabase';
import { WHITELISTED_EMAILS } from './constants';
import { SubscriptionError } from './types';
import { getSubscriptionEndDate } from './utils';

export async function handleWhitelistedUser(userId: string, email: string) {
  if (WHITELISTED_EMAILS.includes(email)) {
    const { error: updateError } = await supabase
      .from('profiles')
      .update({ 
        subscribed: true,
        subscription_start: new Date().toISOString(),
        subscription_end: new Date('2099-12-31').toISOString()
      })
      .eq('id', userId);

    if (updateError) {
      console.error('Error updating whitelisted user subscription:', updateError);
      throw updateError;
    }
  }
}

export async function handleSubscription() {
  try {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      throw new Error('User not authenticated');
    }

    // Check if user's email is whitelisted
    if (WHITELISTED_EMAILS.includes(user.email || '')) {
      await handleWhitelistedUser(user.id, user.email!);
      return true;
    }

    // For non-whitelisted users, proceed with normal subscription flow
    const { data: profile, error: fetchError } = await supabase
      .from('profiles')
      .select('subscribed, subscription_end')
      .eq('id', user.id)
      .single();

    if (fetchError) {
      const error = new Error('Failed to fetch subscription status') as SubscriptionError;
      error.code = 'FETCH_ERROR';
      throw error;
    }

    // Update subscription status
    const { error: updateError } = await supabase
      .from('profiles')
      .update({ 
        subscribed: true,
        subscription_start: new Date().toISOString(),
        subscription_end: getSubscriptionEndDate()
      })
      .eq('id', user.id);

    if (updateError) {
      const error = new Error('Failed to update subscription') as SubscriptionError;
      error.code = 'UPDATE_ERROR';
      throw error;
    }

    return true;
  } catch (error) {
    console.error('Subscription error:', error);
    throw error;
  }
}