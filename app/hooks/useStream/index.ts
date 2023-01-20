import { useState, useEffect } from 'react';
import { transactions } from '@liskhq/lisk-client';

import {
  Method,
  DryRunTxResponse,
} from '~/context/socketContext/types';
import {
  MODULES,
  COMMANDS,
  AUDIO_STREAM_SCHEMA,
  CHAIN_ID,
  HTTP_STATUS,
} from '~/configs';
import { ProfileInfoType } from '~/context/profileContext/types';
import { useAccount } from '../useAccount/useAccount';
import { useWS } from '../useWS/useWS';
import { getTransactionExecutionStatus } from '~/helpers/transaction';
import { bufferize } from '~/helpers/convertors';

interface CreateTxResponse {
  txBytes: string;
  txId: string;
}

const createTx = (audioID: string, account: ProfileInfoType): CreateTxResponse => {
  const tx = {
    module: MODULES.AUDIO,
    command: COMMANDS.STREAM,
    nonce: BigInt(account.nonce),
    senderPublicKey: bufferize(account.publicKey),
    params: {
      audioID: bufferize(audioID),
    },
  };
  const fee = transactions.computeMinFee(tx, AUDIO_STREAM_SCHEMA);
  // Sign the transaction
  const signedTx = transactions.signTransactionWithPrivateKey(
    { ...tx, fee },
    bufferize(CHAIN_ID),
    bufferize(account.privateKey),
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

    if (txStatus === HTTP_STATUS.OK.CODE) {
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
