import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { useSubscription } from '../../hooks/useSubscription';

export default function PrivateRoute() {
  const { user, loading: authLoading } = useAuth();
  const { isSubscribed, loading: subscriptionLoading } = useSubscription();

  if (authLoading || subscriptionLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600" />
      </div>
    );
  }

  // Redirect to auth if not logged in
  if (!user) {
    return <Navigate to="/auth" replace />;
  }

  // Redirect to subscription flow if not subscribed
  if (!isSubscribed) {
    return <Navigate to="/auth?subscription=required" replace />;
  }

  return <Outlet />;
}