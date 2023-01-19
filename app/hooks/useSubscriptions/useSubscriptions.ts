import { useEffect, useState } from 'react';

import { Method, SubsAccountResponse } from '~/context/socketContext/types';
import { DEV_ACCOUNT } from '~/configs/app';
import { useWS } from '../useWS/useWS';
import { useAccount } from '../useAccount/useAccount';


export const useSubscriptions = () => {
  const { info } = useAccount();
  const [subIDs, setSubIDs] = useState<string[]>([]);
  const { request } = useWS();

  const getSubscriptions = async () => {
    const response = <SubsAccountResponse> await request(
      Method.subscription_getAccount,
      { address: DEV_ACCOUNT.ADDRESS },
    );

    if (!response.error) {
      setSubIDs(response.data.subscription.owned);
    }
  };

  useEffect(() => {
    if (!subIDs.length && info.address) {
      getSubscriptions();
    }
  }, [info]);

  return {
    subscriptions: subIDs,
    getSubscriptions,
  };
};
