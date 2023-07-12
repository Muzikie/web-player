/* Internal dependencies */
import { HTTP_STATUS } from '~/configs';
import { BroadcastProps } from '../useCreateEntity/types';
import { dryRunTransaction, broadcastTransaction } from '~/models/entity.client';
import { getTransactionExecutionStatus, getEntityEvent } from '~/helpers/transaction';
import { signTransaction } from './utils';

export const useBroadcast = () => {
  const broadcast = async (props: BroadcastProps) => {
    const { module, command, account, params } = props;
    const result = await signTransaction({ command, module, account, params });
    if (result instanceof Error) {
      return {
        error: true,
        message: result.message || HTTP_STATUS.NOT_SIGNED.MESSAGE,
      };
    }
    const { txId, txBytes } = result;
    const txString = txBytes.toString('hex');

    // dry-run transaction to get the errors
    const dryRunResponse = await dryRunTransaction({ transaction: txString });

    const txStatus = getTransactionExecutionStatus(module, txId, dryRunResponse);
    if (txStatus === HTTP_STATUS.OK.CODE) {
      const broadcastResponse = await broadcastTransaction({ transaction: txString });

      // Check if the NFT is created correctly
      if (!broadcastResponse.error) {
        return {
          message: HTTP_STATUS.OK.MESSAGE,
          error: false,
          events: getEntityEvent(module, dryRunResponse),
        };
      }
      return {
        message: HTTP_STATUS.INTERNAL_ERROR.MESSAGE,
        error: true,
        events: getEntityEvent(module, dryRunResponse),
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
