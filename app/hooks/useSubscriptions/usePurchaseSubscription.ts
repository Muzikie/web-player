import { useEffect, useState } from 'react';
import { cryptography } from '@liskhq/lisk-client';

import { useWS } from '../useWS/useWS';
import { Method, SubsAccountResponse } from '~/context/socketContext/types';
import {
  MODULES,
  COMMANDS,
  DEV_ACCOUNT,
  HTTP_STATUS,
} from '~/configs';
import { useAccount } from '../useAccount/useAccount';
import { FetchStatus } from './types';
import { bufferize } from '~/helpers/convertors';
import { useBroadcast } from '../useBroadcast/useBroadcast'

export const usePurchaseSubscription = () => {
  const [ids, setIDs] = useState<string[]>([]);
  const [fetchStatus, setStatus] = useState<FetchStatus>(FetchStatus.loading);
  const { updateAccount } = useAccount();
  const { request, isConnected } = useWS();
  const { broadcast } = useBroadcast();

  const getAvailableSubs = async () => {
    const devAccountInfo = <SubsAccountResponse>(
      await request(Method.subscription_getAccount, { address: DEV_ACCOUNT.ADDRESS })
    );
    if (!devAccountInfo.error && devAccountInfo.data.subscription?.owned.length > 0) {
      setIDs(devAccountInfo.data.subscription?.owned);
      setStatus(FetchStatus.success);
    } else {
      setStatus(FetchStatus.error);
    }
  };

  const purchase = async () => {
    // @todo We should inform the user that there are no subscriptions available
    if (!ids.length) return {
      error: true,
      message: HTTP_STATUS.INTERNAL_ERROR.MESSAGE,
    };

    const data = await updateAccount();
    // Create blockchain transaction and broadcast it
    const result = await broadcast({
      module: MODULES.SUBSCRIPTION,
      command: COMMANDS.PURCHASE,
      params: {
        subscriptionID: bufferize(ids[0]),
        members: [cryptography.address.getAddressFromLisk32Address(data.address)],
      },
      account: data,
      files: [],
    });
    return result;
  };

  useEffect(() => {
    if (isConnected) {
      getAvailableSubs();
    }
  }, [isConnected]);

  return {
    purchase,
    fetchStatus,
  };
};
