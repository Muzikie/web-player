import React from 'react';
import {useActiveSubscription} from '~/hooks/useSubscriptions';
import Modal from '../Modal';
import { PrimaryButton } from '../common/Button';
import { SubscriptionInfoProps } from './types';
import NoSubscription from './NoSubscription';

// @todo convert the numeric values to MZK
const SubscriptionInfo = ({ data }: SubscriptionInfoProps) => {
  const list = [
    { title: 'Price', content: data.price },
    { title: 'Value to spend', content: data.consumable },
    { title: 'Consumed', content: (data.price * 0.8) - data.consumable },
    { title: 'Members', content: `${data.maxMembers} user` }
  ];

  return (
    <div className="subscriptionInfo">
      <h3>Free trial</h3>
      <ul>
        {
          list.map(({title, content}) => (
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
