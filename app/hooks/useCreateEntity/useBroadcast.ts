/* External dependencies */
import { useState, ChangeEvent, useEffect } from 'react';
import { transactions, cryptography } from '@liskhq/lisk-client';
import md5 from 'md5';

/* Internal dependencies */
import { useAccount } from '~/hooks/useAccount/useAccount';
import {
  MODULES,
  COMMANDS,
  AUDIO_CREATE_SCHEMA,
  CHAIN_ID,
  HTTP_STATUS,
} from '~/configs';
import {
  DryRunTxResponse,
  PostTxResponse,
  Method,
} from '~/context/socketContext/types';
import { useWS } from '../useWS/useWS';
import { ValidationStatus } from './types';
import { validate } from './validator';
import { postTransaction } from '~/models/entity.client';
import { getTransactionExecutionStatus } from '~/helpers/transaction';
import { bufferize } from '~/helpers/convertors';
import { signTransaction } from './utils';

export const useBroadcast = () => {
  const { updateAccount } = useAccount();
  const { request } = useWS();
  const [feedback, setFeedback] = useState<{ message: string; error: boolean }>({ message: '', error: false });

  const broadcast = async ({
    module, command, params, account, files,
  }) => {
    const { transaction, txId, txBytes } = await signTransaction({ module, command, params, account, files });

    // dry-run transaction to get the errors
    const dryRunResponse = <DryRunTxResponse> await request(
      Method.txpool_dryRunTransaction,
      { transaction: txBytes.toString('hex') },
    );
    // broadcast transaction
    const txStatus = getTransactionExecutionStatus(MODULES.AUDIO, txId, dryRunResponse);
    if (txStatus === HTTP_STATUS.OK.CODE) {
      const postResponse = await postTransaction({
        transactionID: txId,
        creatorAddress: account.address,
        module: MODULES.AUDIO,
        command: COMMANDS.CREATE,
        audioHash: transaction.params.audioHash,
        audioSignature: transaction.params.audioSignature,
      }, files, ['audio']);

      // Tell Streamer about it
      if (postResponse?._id) {
        const response = <PostTxResponse> await request(
          Method.txpool_postTransaction,
          { transaction: txBytes.toString('hex') },
        );

        // Check if the NFT is created correctly
        if (!response.error) {
          setFeedback({ message: HTTP_STATUS.OK.MESSAGE, error: false });
        } else {
          setFeedback({ message: HTTP_STATUS.BAD_REQUEST.MESSAGE, error: true });
        }
      }
    } else {
      setFeedback({ message: HTTP_STATUS.NOT_SIGNED.MESSAGE, error: true });
    }
  };

  return {
    broadcast,
    feedback,
  };
};
