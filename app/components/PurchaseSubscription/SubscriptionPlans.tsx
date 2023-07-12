import React from 'react';

import { TOKEN } from '~/configs';
import { PrimaryButton } from '~/components/common/Button';
import Feedback from '~/components/Feedback';
import { fromBaseToken } from '~/helpers/formatters';
import { SubscriptionPlanProps, SubscriptionPlansProps } from './types';

const SubscriptionPlan = ({
  data, feedback, onSubmit,
}: SubscriptionPlanProps) => (
  <section className="subscriptionPlan">
    <h3>{data.name || 'Plan name'}</h3>
    {
      data.maxMembers === 1
        ? <h4>For 1 user</h4>
        : <h4>{`Share it with ${data.maxMembers - 1} ${data.maxMembers === 2 ? 'friend' : 'friends'}`}</h4>
    }
    <h3>{fromBaseToken(data.price, TOKEN)}</h3>
    <PrimaryButton
      className="subscribeButton"
      disabled={!!feedback.error || feedback.message !== ''}
      onClick={onSubmit}
    >
      Purchase
    </PrimaryButton>
  </section>
);

const SubscriptionPlans = ({
  data, feedback, onSubmit
}: SubscriptionPlansProps) => (
  <section className="plans">
    <div className="container">
      <h2>Pick your plan</h2>
    </div>
    <div className="plan-list">
      {
        data.map((plan, index) => (
          <SubscriptionPlan
            key={index}
            data={plan}
            feedback={feedback}
            onSubmit={onSubmit}
          />
        ))
      }
    </div>
    <Feedback data={feedback} />
  </section>
);

export default SubscriptionPlans;
