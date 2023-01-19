import React from 'react';
import BigNumber from 'bignumber.js';

import { fromBaseToken } from '~/helpers/formatters';
import { useActiveSubscription } from '~/hooks/useSubscriptions';
import Modal from '../Modal';
import { PrimaryButton } from '../common/Button';
import { SubscriptionInfoProps } from './types';
import NoSubscription from './NoSubscription';
import { TOKEN, DEV_SHARE } from '~/configs/app';

const getConsumed = (price: string, consumable: string): string => {
  const factor = new BigNumber(DEV_SHARE);
  const priceBN = new BigNumber(price);
  const consumableBN = new BigNumber(consumable);
  const consumedBN = priceBN.multipliedBy(factor).minus(consumableBN);
  return consumedBN.toString();
}

const SubscriptionInfo = ({ data }: SubscriptionInfoProps) => {
  const list = [
    { title: 'Price', content: fromBaseToken(data.price, TOKEN) },
    { title: 'Value to spend', content: fromBaseToken(data.consumable, TOKEN) },
    { title: 'Consumed', content: fromBaseToken(getConsumed(data.price, data.consumable), TOKEN) },
    { title: 'Members', content: `${data.maxMembers} user ${data.maxMembers === 1 ? '' : 's'}` }
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
const ActiveSubscription = () => {
  const { subscription } = useActiveSubscription();

  if (!subscription) {
    return <NoSubscription
      title="You don't have an active subscription"
      content="You can subscribe to a plan to enjoy free music"
    />;
  }
  return (
    <section className="component activeSubscription">
      <SubscriptionInfo data={subscription} />
      <Modal className="subscriptionFooter">
        <div className="wrapper">
          <figure>
            <img
              className="svg"
              src="/images/letter.svg"
              alt="Letter icon"
            />
          </figure>
          <header>
            <h4>
              Spread the word of Muzikie
              <br />
              let others enjoy free music too
            </h4>
          </header>
          <PrimaryButton theme="white">Share link</PrimaryButton>
        </div>
      </Modal>
    </section>
  );
};

export default ActiveSubscription;
