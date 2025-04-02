import { supabase } from './supabase';

export async function updateSubscriptionStatus(userId: string, subscriptionData: {
  subscribed: boolean;
  subscription_start?: string;
  subscription_end?: string;
}) {
  const { error } = await supabase
    .from('profiles')
    .update({
      subscribed: subscriptionData.subscribed,
      subscription_start: subscriptionData.subscription_start,
      subscription_end: subscriptionData.subscription_end
    })
    .eq('id', userId);

  if (error) throw error;
}

export async function startFreeTrial(userId: string) {
  const trialEnd = new Date();
  trialEnd.setDate(trialEnd.getDate() + 7); // 7-day trial

  await updateSubscriptionStatus(userId, {
    subscribed: true,
    subscription_start: new Date().toISOString(),
    subscription_end: trialEnd.toISOString()
  });
}