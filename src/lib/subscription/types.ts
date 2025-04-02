export type SubscriptionStatus = 'trialing' | 'active' | 'past_due' | 'canceled' | 'expired';

export interface SubscriptionData {
  subscribed: boolean;
  subscription_status: SubscriptionStatus;
  subscription_start?: string;
  subscription_end?: string;
  trial_start?: string;
  trial_end?: string;
  subscription_id?: string;
}

export interface SubscriptionError extends Error {
  code?: string;
}