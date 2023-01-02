import { useEffect, useState } from 'react';

import { useWS } from '../useWS/useWS';
import {
  Method,
  SubscriptionResponse,
  SubsAccountResponse,
  SubscriptionData,
} from '~/context/socketContext/types';
import { useAccount } from '../useAccount/useAccount';
import { SubscriptionStatus } from './types';

/**
 * Returns the information of the active subscription
 * of the logged in (active) account
 */
export const useActiveSubscription = () => {
  const { info } = useAccount();
  const [subscription, setSubscription] = useState<SubscriptionData|null>();
  const [subscriptionStatus, setStatus] = useState<SubscriptionStatus>(SubscriptionStatus.loading);
  const { request } = useWS();

  const updateSubscription = async () => {
    if (!info.address) {
      // set empty data
      setStatus(SubscriptionStatus.notLoggedIn);
    } else {
      const accountInfo = <SubsAccountResponse> await request(
        Method.subscription_getAccount,
        { address: info.address },
      );
      if (!accountInfo.error && accountInfo.data.subscription?.shared.length > 0) {
        const response = <SubscriptionResponse> await request(
          Method.subscription_getSubscription,
          { subscriptionID: accountInfo.data.subscription.shared },
        );
  
        if (!response.error) {
          setSubscription(response.data);
          setStatus(SubscriptionStatus.subscribed);
        } else {
          // set empty data
          setStatus(SubscriptionStatus.notSubscribed);
        }
      } else {
        // set empty data
        setStatus(SubscriptionStatus.notSubscribed);
      }
    }
  };

  useEffect(() => {
    if (info.address) {
      updateSubscription();
    }
  }, [info.address]);

  return {
    subscriptionStatus,
    subscription,
    updateSubscription,
  };
};
