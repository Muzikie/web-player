/* Internal dependencies */
import { HTTP_STATUS } from '~/configs';
import { DryRunTxResponse, PostTxResponse, Method } from '~/context/socketContext/types';
import { useWS } from '../useWS/useWS';
import { signTransactionProps } from './types';
import { postTransaction } from '~/models/entity.client';
import { getTransactionExecutionStatus } from '~/helpers/transaction';
import { signTransaction } from './utils';

export const useBroadcast = () => {
  const { request } = useWS();

  const broadcast = async ({ module, command, params, account, files }: signTransactionProps) => {
    const result = await signTransaction({ module, command, params, account, files });
    if (result instanceof Error) {
      return {
        error: true,
        message: result.message || HTTP_STATUS.NOT_SIGNED.MESSAGE,
      };
    }
    const { txId, txBytes, transaction } = result;

    // dry-run transaction to get the errors
    const dryRunResponse = <DryRunTxResponse>(
      await request(Method.txpool_dryRunTransaction, { transaction: txBytes.toString('hex') })
    );

    const txStatus = getTransactionExecutionStatus(module, txId, dryRunResponse);
    if (txStatus === HTTP_STATUS.OK.CODE) {
      // Post transaction to the Streamer
      const postResponse = await postTransaction(
        {
          transactionID: txId,
          creatorAddress: account.address,
          module,
          command,
          ...Object.keys(transaction?.params ?? {})
            .filter(key => key.match(/Hash|Signature/))
            .reduce((hashes: { [key: string]: string }, key) => {
              hashes[key] = params[key] as string;
              return hashes;
            }, {})
        },
        files,
      );

      // Broadcast on the Blockchain
      if ('id' in postResponse) {
        const response = <PostTxResponse>(
          await request(Method.txpool_postTransaction, { transaction: txBytes.toString('hex') })
        );

        // Check if the NFT is created correctly
        if (!response.error) {
          return {
            message: HTTP_STATUS.OK.MESSAGE,
            error: false
          };
        }
        return {
          message: HTTP_STATUS.INTERNAL_ERROR.MESSAGE,
          error: true
        };

      }
      return {
        message: HTTP_STATUS.INTERNAL_ERROR.MESSAGE,
        error: true,
      };
    }
    return {
      message: HTTP_STATUS.BAD_REQUEST.MESSAGE,
      error: true,
    };
  };

  return {
    broadcast,
  };
};
