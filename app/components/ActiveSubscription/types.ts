import { ReactNode } from 'react';

export interface NoSubscriptionProps {
  title: string;
  content: ReactNode;
}

// @todo Replace any with Subscription when it's ready
export interface SubscriptionInfoProps {
  data: any;
}
