import { useEffect, useState } from 'react';
import { cryptography, transactions } from '@liskhq/lisk-client';

import { useWS } from '../useWS/useWS';
import {
  Method,
  DryRunTxResponse,
  SubsAccountResponse,
} from '~/context/socketContext/types';
import {
  MODULES,
  COMMANDS,
  SUBSCRIPTION_PURCHASE_SCHEMA,
  CHAIN_ID,
  DEV_ACCOUNT,
  HTTP_STATUS,
} from '~/configs';
import { useAccount } from '../useAccount/useAccount';
import { FetchStatus } from './types';
import { getTransactionExecutionStatus } from '~/helpers/transaction';

export const usePurchaseSubscription = () => {
  const [ids, setIDs] = useState<string[]>([]);
  const [fetchStatus, setStatus] = useState<FetchStatus>(FetchStatus.loading);
  const { info, updateAccount } = useAccount();
  const { request, isConnected } = useWS();

  const getAvailableSubs = async () => {
    const devAccountInfo = <SubsAccountResponse> await request(
      Method.subscription_getAccount,
      { address: DEV_ACCOUNT.ADDRESS },
    );
    if (!devAccountInfo.error && devAccountInfo.data.subscription?.owned.length > 0) {
      setIDs(devAccountInfo.data.subscription?.owned);
      setStatus(FetchStatus.success);
    } else {
      setStatus(FetchStatus.error);
    }
  };

  const purchase = async () => {
    if (!ids.length) return HTTP_STATUS.BAD_REQUEST.MESSAGE;

    const data = await updateAccount();
    // Create blockchain transaction and broadcast it
    const tx = {
      module: MODULES.SUBSCRIPTION,
      command: COMMANDS.PURCHASE,
      nonce: BigInt(data.nonce),
      senderPublicKey: Buffer.from(data.publicKey, 'hex'),
      params: {
        subscriptionID: Buffer.from(ids[0], 'hex'),
        members: [cryptography.address.getAddressFromLisk32Address(data.address)]
      },
    };
    const fee = transactions.computeMinFee(tx, SUBSCRIPTION_PURCHASE_SCHEMA);
    // Sign the transaction
    const signedTx = transactions.signTransactionWithPrivateKey(
      { ...tx, fee },
      Buffer.from(CHAIN_ID, 'hex'),
      Buffer.from(info.privateKey, 'hex'),
      SUBSCRIPTION_PURCHASE_SCHEMA
    );
    if (!signedTx.id || !Buffer.isBuffer(signedTx.id)) {
      return {
        txBytes: '',
        txId: '',
      }
    }
    const txId = signedTx.id.toString('hex');
    const txBytes = transactions.getBytes(signedTx, SUBSCRIPTION_PURCHASE_SCHEMA);
    // dry-run transaction to get the errors
    const dryRunResponse = <DryRunTxResponse> await request(
      Method.txpool_dryRunTransaction,
      { transaction: txBytes.toString('hex') },
    );
    // broadcast transaction
    const txStatus = getTransactionExecutionStatus(MODULES.SUBSCRIPTION, txId, dryRunResponse);
    if (txStatus === HTTP_STATUS.OK.CODE) {
      const response = await request(
        Method.txpool_postTransaction,
        { transaction: txBytes.toString('hex') },
      );

      if (!response.error) {
        return HTTP_STATUS.OK.MESSAGE;
      }
    }
    return HTTP_STATUS.BAD_REQUEST.MESSAGE;
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
