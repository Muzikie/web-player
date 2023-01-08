import React from 'react';
import {useActiveSubscription} from '~/hooks/useSubscriptions';
import Modal from '../Modal';
import { PrimaryButton } from '../common/Button';
import NoSubscription from './NoSubscription';

const list = [
  {title: 'Price', content: 'Free'},
  {title: 'Value to spend', content: '30 MZK'},
  {title: 'Consumed', content: '10.12330 MZK'},
  {title: 'Members', content: 'I user'}
];

const SubscriptionInfo = () => {
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
  const {subscription} = useActiveSubscription();

  if (!subscription) {
    return <NoSubscription
      title="You don't have an active subscription"
      content="You can subscribe to a plan to enjoy free music"
    />;
  }
  return (
    <section className="component activeSubscription">
      <SubscriptionInfo />
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
