export interface StripeSubscription {
  id: string;
  status: string;
  current_period_end: number;
  trial_end: number | null;
}

export interface StripeError {
  message: string;
  code?: string;
}