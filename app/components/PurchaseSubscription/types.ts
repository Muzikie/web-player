import { Subscription } from '~/configs';

export interface SubscriptionPlanProps {
  data: Subscription;
  onSubmit: () => void;
  feedback: {
    error: boolean;
    message: string;
  };
}

export interface SubscriptionPlansProps {
  data: Subscription[];
  onSubmit: () => void;
  feedback: {
    error: boolean;
    message: string;
  };
}

export interface PurchaseSubscriptionProps {
  subscriptionPlans: Subscription[];
}

export interface Reason {
  title: string;
  description: string;
  icon: string;
}
