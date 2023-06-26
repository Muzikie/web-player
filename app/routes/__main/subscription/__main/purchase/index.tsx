import React from 'react';
import { json } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';

import PurchaseSubscription from '~/components/PurchaseSubscription';
import WalletDetails from '~/components/WalletDetails';
import ActionAndInfo from '~/components/ActionAndInfo';
import Modal from '~/components/Modal';
import {
  PurchaseLoaderProps,
  PurchaseSubscriptionData,
} from '~/routes/types';
import { getSubscriptions } from '~/models/entity.server';
import { DEV_ACCOUNT, Subscription } from '~/configs';
import { getSession } from '~/hooks/useSession';

export const loader = async ({ request }: PurchaseLoaderProps) => {
  const session = await getSession(
    request.headers.get('Cookie')
  );

  const { data: subscriptions } = await getSubscriptions({
    params: {
      creatorAddress: DEV_ACCOUNT.ADDRESS,
    }
  });

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
    id: session.get('address'),
  });
};

const PurchaseSubscriptionScreen = () => {
  const {
    subscriptionPlans,
    id,
  } = useLoaderData() as PurchaseSubscriptionData;

  return (
    <section className="screen subscription tabContainer">
      <div className='wrap'>
        <section className='wallet'>
          <WalletDetails address={id} />
        </section>
        <section className='warningInfo'>
          <Modal className='modalRelative warning'>
            <ActionAndInfo />
          </Modal>
        </section>
      </div>
      <PurchaseSubscription subscriptionPlans={subscriptionPlans} />
    </section>
  );
};

export default PurchaseSubscriptionScreen;
