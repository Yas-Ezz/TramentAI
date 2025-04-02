import { SubscriptionData } from './types';
import { WHITELISTED_EMAILS } from './constants';

export function isSubscriptionActive(data: SubscriptionData | null, email?: string | null): boolean {
  // Check for whitelisted emails first
  if (email && WHITELISTED_EMAILS.includes(email)) {
    return true;
  }

  if (!data?.subscribed) return false;

  const now = new Date();
  
  // Check trial period
  if (data.subscription_status === 'trialing' && data.trial_end) {
    return new Date(data.trial_end) > now;
  }

  // Check active subscription
  if (data.subscription_status === 'active' && data.subscription_end) {
    return new Date(data.subscription_end) > now;
  }

  return false;
}

export function getTrialEndDate(): string {
  const date = new Date();
  date.setDate(date.getDate() + 7); // 7-day trial
  return date.toISOString();
}

export function getSubscriptionEndDate(): string {
  const date = new Date();
  date.setMonth(date.getMonth() + 1); // 1-month subscription
  return date.toISOString();
}