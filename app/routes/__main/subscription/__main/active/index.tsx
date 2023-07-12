/* External dependencies */
import React from 'react';
import { json } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';

/* Internal dependencies */
import ActiveSubscription from '~/components/ActiveSubscription';
import { getSubscriptions } from '~/models/entity.server';
import { getSession } from '~/hooks/useSession';
import {
  ListScreenProps,
  ActiveSubscriptionData,
} from '~/routes/types';

export const loader = async ({ request }: ListScreenProps) => {
  const session = await getSession(
    request.headers.get('Cookie')
  );
  const address = session.get('address');

  const { data: subscriptions } = await getSubscriptions({ params: {
    memberAddress: address,
  } });

  return json<ActiveSubscriptionData>({
    activeSubscription: subscriptions.length ? subscriptions[0] : null,
  });
};

const ActiveSubscriptionScreen = () => {
  const {
    activeSubscription,
  } = useLoaderData() as ActiveSubscriptionData;

  return (
    <section className="screen active tabContainer">
      <ActiveSubscription data={activeSubscription} />
    </section>
  );
};

export default ActiveSubscriptionScreen;
