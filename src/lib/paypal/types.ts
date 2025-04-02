export interface PayPalSubscriptionResponse {
  subscriptionID: string;
  status: string;
  createTime: string;
  links: Array<{
    href: string;
    rel: string;
    method: string;
  }>;
}

export interface PayPalError {
  message: string;
  code?: string;
}