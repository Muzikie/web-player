import React, { useState } from 'react';

/* Internal dependencies */
import { usePurchaseSubscription } from '~/hooks/useSubscriptions';
import SubscriptionPlans from './SubscriptionPlans';
import WhyMuzikie from './WhyMuzikie';
import Intro from './Intro';
import { PurchaseSubscriptionProps } from './types';

const PurchaseSubscription = ({ subscriptionPlans }: PurchaseSubscriptionProps) => {
  const [feedback, setFeedback] = useState({
    error: false,
    message: '',
  });
  const { purchase } = usePurchaseSubscription();

  const onSubmit = async () => {
    setFeedback({
      error: false,
      message: 'loading',
    });
    const feedback = await purchase();
    setFeedback(feedback);
  };

  return (
    <section className="component purchase">
      <Intro />
      <SubscriptionPlans
        onSubmit={onSubmit}
        feedback={feedback}
        data={subscriptionPlans}
      />
      <WhyMuzikie />
    </section>
  );
};

export default PurchaseSubscription;

{/* <section className="share">
  <div className="container">
    <header className="title">
      <figure>
        <img src="/images/letter.svg" alt="Letter icon" />
      </figure>
      <h4>
        Share the word of Muzikie and receive free subscription
      </h4>
    </header>
    <p>
      Muzikie has embarked on an exciting mission to bring transparency and fairness to the music distribution industry.
      We are excited to build it, and we need your support and feedback on this mission.
    </p>
  </div>
</section> */}

{/* <div className="social">
  <ul>
    <li>
      <img src="/images/checkmark.svg" alt="checkmark icon" />
      <Link
        className="checked"
        theme="dark"
        to="/twitter"
      >
        Follow Muzikie on Twitter
      </Link>
    </li>
    <li>
      <Icon name='twitter1' />
      <Link
        className="notChecked"
        theme="dark"
        to="/twitter"
      >
        Share a tweet about Muzikie
      </Link>
    </li>
    <li>
      <Icon name='telegram' />
      <Link
        className="notChecked"
        theme="dark"
        to="/telegram"
      >
        Join the Telegram channel
      </Link>
    </li>
  </ul>
</div> */}
