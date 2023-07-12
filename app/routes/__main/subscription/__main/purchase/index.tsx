import React from 'react';
import { json } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';

import PurchaseSubscription from '~/components/PurchaseSubscription';
import {
  PurchaseSubscriptionData,
} from '~/routes/types';
import { getSubscriptions } from '~/models/entity.server';
import { DEV_ACCOUNT, Subscription } from '~/configs';

export const loader = async () => {
  const { data: subscriptions } = await getSubscriptions({ params: {
    creatorAddress: DEV_ACCOUNT.ADDRESS,
  } });

  const subscriptionPlans: Record<string, Subscription> = subscriptions.reduce((acc: Record<string, Subscription>, subscription: Subscription) => {
    const {
      price,
      maxMembers,
    } = subscription;

    if (!acc[`${price}-${maxMembers}`]) {
      acc[`${price}-${maxMembers}`] = subscription;
    }

    return acc;
  }, {});

  return json<PurchaseSubscriptionData>({
    subscriptionPlans: Object.values(subscriptionPlans),
  });
};

const PurchaseSubscriptionScreen = () => {
  const {
    subscriptionPlans,
  } = useLoaderData() as PurchaseSubscriptionData;

  return (
    <section className="screen subscription tabContainer">
      <PurchaseSubscription subscriptionPlans={subscriptionPlans} />
    </section>
  );
};

export default PurchaseSubscriptionScreen;
