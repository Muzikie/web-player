/* Internal dependencies */
import { HTTP_STATUS } from '~/configs';
import { SignTransactionProps } from '../useCreateEntity/types';
import { uploadFiles, dryRunTransaction, broadcastTransaction } from '~/models/entity.client';
import { getTransactionExecutionStatus, getEntityIDFromDryRunEvents } from '~/helpers/transaction';
import { signTransaction } from './utils';

export const useBroadcast = () => {
  const broadcast = async (props: SignTransactionProps) => {
    const { module, files } = props;
    const result = await signTransaction(props);
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
      const entityID = getEntityIDFromDryRunEvents(module, dryRunResponse);
      const postResponse = await uploadFiles([{
        id: entityID,
        file: files[0],
      }]);
      const uploadSuccess = postResponse.reduce((acc, curr) => {
        if (curr.error === true || !acc) {
          acc = false;
        }
        return acc;
      }, true);

      // Broadcast on the Blockchain
      if (uploadSuccess) {
        const broadcastResponse = await broadcastTransaction({ transaction: txString });

        // Check if the NFT is created correctly
        if (!broadcastResponse.error) {
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
