import { useEffect, useState } from 'react';

import { useWS } from '../useWS/useWS';
import { Method, SubsAccountResponse } from '~/context/socketContext/types';
import { DEV_ACCOUNT } from '~/constants/app';


export const useSubscriptions = () => {
  const [subIDs, setSubIDs] = useState<string[]>([]);
  const { request } = useWS();

  const retrieveData = async () => {
    const response = <SubsAccountResponse> await request(
      Method.subscription_getAccount,
      { address: DEV_ACCOUNT.ADDRESS },
    );

    if (!response.error) {
      setSubIDs(response.data?.subscription);
    }
  };

  useEffect(() => {
    retrieveData();
  }, []);

  return {
    subscriptions: subIDs,
  };
};
