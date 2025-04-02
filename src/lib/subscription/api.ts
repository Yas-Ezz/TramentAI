import { supabase } from '../supabase';
import { SubscriptionData } from './types';
import { getTrialEndDate } from './utils';

export async function startFreeTrial(userId: string): Promise<void> {
  const now = new Date().toISOString();
  
  const { error } = await supabase
    .from('profiles')
    .update({
      subscribed: true,
      subscription_status: 'trialing',
      trial_start: now,
      trial_end: getTrialEndDate()
    })
    .eq('id', userId);

  if (error) throw error;
}

export async function activateSubscription(
  userId: string, 
  subscriptionId: string
): Promise<void> {
  const { error } = await supabase
    .from('profiles')
    .update({
      subscribed: true,
      subscription_status: 'active',
      subscription_id: subscriptionId,
      subscription_start: new Date().toISOString(),
      subscription_end: getSubscriptionEndDate()
    })
    .eq('id', userId);

  if (error) throw error;
}

export async function getSubscriptionStatus(userId: string): Promise<SubscriptionData | null> {
  const { data, error } = await supabase
    .from('profiles')
    .select(`
      subscribed,
      subscription_status,
      subscription_start,
      subscription_end,
      trial_start,
      trial_end,
      subscription_id
    `)
    .eq('id', userId)
    .single();

  if (error) throw error;
  return data;
}