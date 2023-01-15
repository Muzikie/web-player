import { useState, useEffect } from 'react';
import { transactions } from '@liskhq/lisk-client';

import {
  Method,
  DryRunTxResponse,
} from '~/context/socketContext/types';
import { useAccount } from '../useAccount/useAccount';
import { AUDIO_STREAM_SCHEMA, MODULES, COMMANDS } from '~/constants/blockchain';
import { CHAIN_ID, TX_STATUS } from '~/constants/app';
import { ProfileInfoType } from '~/context/profileContext/types';
import { useWS } from '../useWS/useWS';
import { getTransactionExecutionStatus } from '~/helpers/transaction';

interface CreateTxResponse {
  txBytes: string;
  txId: string;
}

const createTx = (audioID: string, account: ProfileInfoType): CreateTxResponse => {
  const tx = {
    module: MODULES.AUDIO,
    command: COMMANDS.STREAM,
    nonce: BigInt(account.nonce),
    senderPublicKey: Buffer.from(account.publicKey, 'hex'),
    params: {
      audioID: Buffer.from(audioID, 'hex'),
    },
  };
  const fee = transactions.computeMinFee(tx, AUDIO_STREAM_SCHEMA);
  // Sign the transaction
  const signedTx = transactions.signTransactionWithPrivateKey(
    { ...tx, fee },
    Buffer.from(CHAIN_ID, 'hex'),
    Buffer.from(account.privateKey, 'hex'),
    AUDIO_STREAM_SCHEMA
  );
  if (!signedTx.id || !Buffer.isBuffer(signedTx.id)) {
    return {
      txBytes: '',
      txId: '',
    }
  }
  const txId = signedTx.id.toString('hex');
  const txBytes = transactions.getBytes(signedTx, AUDIO_STREAM_SCHEMA);
  return {
    txBytes: txBytes.toString('hex'),
    txId,
  };
};

export const useStream = () => {
  const { updateAccount } = useAccount();
  const { request } = useWS();
  const [queue, setQueue] = useState<string[]>([]);

  const registerStream = (audioID: string) => {
    setQueue((prevQueue) => [...prevQueue, audioID]);
  };

  const registerOne = async (audioID: string) => {
    const account = await updateAccount();
    const { txBytes, txId } = createTx(audioID, account);
    const dryRunResponse = <DryRunTxResponse> await request(
      Method.txpool_dryRunTransaction,
      { transaction: txBytes },
    );
    const txStatus = getTransactionExecutionStatus(MODULES.AUDIO, txId, dryRunResponse);

    if (txStatus === TX_STATUS.SUCCESS) {
      const response = await request(
        Method.txpool_postTransaction,
        { transaction: txBytes },
      );

      if (!response.error) {
        setQueue((prevQueue) => prevQueue.filter(item => item !== audioID));
      }
    }
  };

  useEffect(() => {
    if (queue.length) {
      const oldestAudioID = queue[0];
      registerOne(oldestAudioID);
    }
  }, [queue]);

  return { registerStream };
};