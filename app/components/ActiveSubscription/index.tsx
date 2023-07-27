import React from 'react';
import BigNumber from 'bignumber.js';

import { fromBaseToken } from '~/helpers/formatters';
import EmptyState from '~/components/common/EmptyState';
import { SubscriptionInfoProps } from './types';
import { TOKEN, DEV_SHARE, Subscription } from '~/configs';

const getConsumed = (price: string, consumable: string): string => {
  const factor = new BigNumber(DEV_SHARE);
  const priceBN = new BigNumber(price);
  const consumableBN = new BigNumber(consumable);
  const consumedBN = priceBN.multipliedBy(factor).minus(consumableBN);
  return consumedBN.toString();
};

const SubscriptionInfo = ({ data }: SubscriptionInfoProps) => {
  const list = [
    { title: 'Price', content: fromBaseToken(data.price, TOKEN) },
    { title: 'Value to spend', content: fromBaseToken(data.consumable, TOKEN) },
    { title: 'Consumed', content: fromBaseToken(getConsumed(data.price, data.consumable), TOKEN) },
    { title: 'Members', content: `${data.maxMembers} user${data.maxMembers === 1 ? '' : 's'}` }
  ];

  return (
    <div className="subscriptionInfo">
      <h3>Free trial</h3>
      <ul>
        {
          list.map(({ title, content }) => (
            <li key={title}>
              <span>{title}</span>
              <strong>{content}</strong>
            </li>
          ))
        }
      </ul>
    </div>
  );
};
const ActiveSubscription = ({ data }: { data: Subscription | null }) => {
  if (!data) {
    return (
      <EmptyState
        title="You don't have an active subscription"
        subtitle="You can subscribe to a plan to enjoy free music"
      />
    );
  }
  return (
    <section className="component activeSubscription">
      <SubscriptionInfo data={data} />
    </section>
  );
};

export default ActiveSubscription;
