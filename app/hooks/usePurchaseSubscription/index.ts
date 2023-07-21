import { cryptography } from '@liskhq/lisk-client';

import { getSubscriptionIDs } from '~/models/entity.client';
import {
  MODULES,
  COMMANDS,
} from '~/configs';
import { useAccount } from '../useAccount/useAccount';
import { bufferize } from '~/helpers/convertors';
import { useBroadcast } from '../useBroadcast/useBroadcast';
import { PurchaseErrors } from './types';

export const usePurchaseSubscription = () => {
  const { account } = useAccount();
  const { broadcast } = useBroadcast();

  const purchase = async () => {
    const subNFTs = await getSubscriptionIDs();
    if (subNFTs.length === 0) {
      return {
        error: true,
        message: PurchaseErrors.NoSubNFTs,
      };
    }

    if (!account.balances.length || BigInt(account.balances[0].availableBalance) < BigInt(1000000000)) {
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
    });
    return result;
  };

  return { purchase };
};
