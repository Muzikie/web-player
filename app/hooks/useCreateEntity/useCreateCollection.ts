/* External dependencies */
import { useState } from 'react';
import { cryptography } from '@liskhq/lisk-client';

/* Internal dependencies */
import { useAccount } from '~/hooks/useAccount/useAccount';
import { MODULES, COMMANDS } from '~/configs';
import { useBroadcast } from '../useBroadcast/useBroadcast';
import { Params } from './types';

export const useCreateCollection = () => {
  const { updateAccount } = useAccount();
  const { broadcast } = useBroadcast();

  const [broadcastStatus, setBroadcastStatus] = useState({
    error: false,
    message: '',
    loading: false,
  });

  const signAndBroadcast = async (formValues: Params) => {
    const data = await updateAccount();
    setBroadcastStatus({ error: false, message: '', loading: true });
    const result = await broadcast({
      module: MODULES.COLLECTION,
      command: COMMANDS.CREATE,
      params: {
        name: formValues.name,
        releaseYear: formValues.releaseYear,
        collectionType: formValues.collectionType,
        owners: [{
          address: cryptography.address.getAddressFromLisk32Address(data.address),
          shares: 100
        }]
      },
      account: data,
      files: [{ key: 'cover', value: formValues.files[0] }],
    });
    setBroadcastStatus({ ...result, loading: false });
  };

  return {
    signAndBroadcast,
    broadcastStatus,
  };
};
