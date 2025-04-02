import { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { getSubscriptionStatus } from '../lib/subscription/api';
import { isSubscriptionActive } from '../lib/subscription/utils';
import type { SubscriptionData } from '../lib/subscription/types';

export function useSubscription() {
  const { user } = useAuth();
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [subscriptionData, setSubscriptionData] = useState<SubscriptionData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function checkSubscription() {
      if (!user) {
        setIsSubscribed(false);
        setSubscriptionData(null);
        setLoading(false);
        return;
      }

      try {
        const data = await getSubscriptionStatus(user.id);
        setSubscriptionData(data);
        setIsSubscribed(isSubscriptionActive(data, user.email));
      } catch (err) {
        console.error('Subscription check error:', err);
        setError('Failed to verify subscription status');
        setIsSubscribed(false);
      } finally {
        setLoading(false);
      }
    }

    checkSubscription();
  }, [user]);

  return {
    isSubscribed,
    subscriptionData,
    loading,
    error
  };
}