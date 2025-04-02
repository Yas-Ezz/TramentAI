import { useState } from 'react';
import { useAuth } from '../../../contexts/AuthContext';
import { createSubscription, handleSubscriptionApproval } from '../api';

export function usePayPalSubscription() {
  const { user } = useAuth();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleCreateSubscription = async () => {
    if (!user) return null;
    
    try {
      setLoading(true);
      setError(null);
      return await createSubscription(user.id);
    } catch (err) {
      setError('Failed to create subscription. Please try again.');
      return null;
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = async (subscriptionId: string) => {
    if (!user) return;

    try {
      setLoading(true);
      setError(null);
      await handleSubscriptionApproval(subscriptionId, user.id);
      window.location.href = '/dashboard';
    } catch (err) {
      setError('Failed to activate subscription. Please contact support.');
    } finally {
      setLoading(false);
    }
  };

  return {
    error,
    loading,
    handleCreateSubscription,
    handleApprove
  };
}