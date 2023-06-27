import React from 'react';

import { TOKEN } from '~/configs';
import { PrimaryButton } from '~/components/common/Button';
import Feedback from '~/components/Feedback';
import { fromBaseToken } from '~/helpers/formatters';
import { SubscriptionPlanProps, SubscriptionPlansProps } from './types';
import { useAccount } from '~/hooks/useAccount/useAccount';

const SubscriptionPlan = ({
  data, feedback, onSubmit, availableBalance,
}: SubscriptionPlanProps) => {

  return (
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
        disabled={!!feedback.error || feedback.message !== '' || parseInt(availableBalance) <= parseInt(data.price)}
        onClick={onSubmit}
      >
        Purchase
      </PrimaryButton>
    </section>
  );
};

const SubscriptionPlans = ({
  data, feedback, onSubmit,
}: SubscriptionPlansProps) => {
  const { info } = useAccount();
  const availableBalance = info?.token?.length > 0 ? info.token[0].availableBalance : '0';

  return (
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
              availableBalance={availableBalance}
            />
          ))
        }
      </div>
      <Feedback data={feedback} />
    </section>
  );
};

export default SubscriptionPlans;
