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
  const { account } = useAccount();
  const [subscription, setSubscription] = useState<SubscriptionData|null>();
  const [subscriptionStatus, setStatus] = useState<SubscriptionStatus>(SubscriptionStatus.Loading);
  const { request, isConnected } = useWS();

  const updateSubscription = async () => {
    if (!account.address) {
      // set empty data
      setStatus(SubscriptionStatus.NotLoggedIn);
    } else {
      const accountInfo = <SubsAccountResponse> await request(
        Method.subscription_getAccount,
        { address: account.address },
      );
      if (!accountInfo.error && accountInfo.data.subscription?.shared.length > 0) {
        const response = <SubscriptionResponse> await request(
          Method.subscription_getSubscription,
          { subscriptionID: accountInfo.data.subscription.shared },
        );
  
        if (!response.error) {
          setSubscription(response.data);
          setStatus(SubscriptionStatus.Subscribed);
        } else {
          // set empty data
          setStatus(SubscriptionStatus.NotSubscribed);
        }
      } else {
        // set empty data
        setStatus(SubscriptionStatus.NotSubscribed);
      }
    }
  };

  useEffect(() => {
    if (isConnected && account.address) {
      updateSubscription();
    }
  }, [isConnected]);

  return {
    subscriptionStatus,
    subscription,
    updateSubscription,
  };
};
