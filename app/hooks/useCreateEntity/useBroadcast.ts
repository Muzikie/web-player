/* External dependencies */
import { useState } from 'react';

/* Internal dependencies */
import { MODULES, COMMANDS, HTTP_STATUS } from '~/configs';
import { DryRunTxResponse, PostTxResponse, Method } from '~/context/socketContext/types';
import { useWS } from '../useWS/useWS';
import { signTransactionProps } from './types';
import { postTransaction } from '~/models/entity.client';
import { getTransactionExecutionStatus } from '~/helpers/transaction';
import { signTransaction } from './utils';


export const useBroadcast = () => {
  const { request } = useWS();
  const [feedback, setFeedback] = useState<{ message: string; error: boolean }>({
    message: '',
    error: false,
  });

  const broadcast = async ({ module, command, params, account, files }: signTransactionProps) => {
    const result = await signTransaction({ module, command, params, account, files });
    if (result instanceof Error) {
      return new Error('Error while signing transaction');
    }
    const { transaction, txId, txBytes } = result;
    // handle the successful case

    // dry-run transaction to get the errors
    const dryRunResponse = <DryRunTxResponse>(
      await request(Method.txpool_dryRunTransaction, { transaction: txBytes.toString('hex') })
    );
    // broadcast transaction
    const txStatus = getTransactionExecutionStatus(MODULES.AUDIO, txId, dryRunResponse);
    if (txStatus === HTTP_STATUS.OK.CODE) {
      const postResponse = await postTransaction(
        {
          transactionID: txId,
          creatorAddress: account.address,
          module: MODULES.AUDIO,
          command: COMMANDS.CREATE,
          audioHash: transaction.params.audioHash,
          audioSignature: transaction.params.audioSignature,
        },
        files[0].value,
        files[0].key,
      );

      // Tell Streamer about it
      if (postResponse?._id) {
        const response = <PostTxResponse>(
          await request(Method.txpool_postTransaction, { transaction: txBytes.toString('hex') })
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
