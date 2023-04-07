import { cryptography } from '@liskhq/lisk-client';

import { useWS } from '../useWS/useWS';
import { Method, SubsAccountResponse } from '~/context/socketContext/types';
import {
  MODULES,
  COMMANDS,
  DEV_ACCOUNT,
} from '~/configs';
import { useAccount } from '../useAccount/useAccount';
import { bufferize } from '~/helpers/convertors';
import { useBroadcast } from '../useBroadcast/useBroadcast'
import { PurchaseErrors } from './types';

export const usePurchaseSubscription = () => {
  const { updateAccount } = useAccount();
  const { request } = useWS();
  const { broadcast } = useBroadcast();

  const getSubNFTs = async () => {
    const devAccountInfo = <SubsAccountResponse>(
      await request(Method.subscription_getAccount, { address: DEV_ACCOUNT.ADDRESS })
    );

    if (!devAccountInfo.error && devAccountInfo.data.subscription?.owned.length > 0) {
      return devAccountInfo.data.subscription?.owned;
    }
    return [];
  };

  const purchase = async () => {
    const subNFTs = await getSubNFTs();
    if (subNFTs.length === 0) {
      return {
        error: true,
        message: PurchaseErrors.NoSubNFTs,
      };
    }

    const account = await updateAccount();
    if (account.balances.length === 0) {
      return {
        error: true,
        message: PurchaseErrors.InsufficientBalance,
      };
    }

    // Create blockchain transaction and broadcast it
    const result = await broadcast({
      module: MODULES.SUBSCRIPTION,
      command: COMMANDS.PURCHASE,
      params: {
        subscriptionID: bufferize(subNFTs[0]),
        members: [cryptography.address.getAddressFromLisk32Address(account.address)],
      },
      account,
      files: [],
    });
    return result;
  };

  return { purchase };
};
