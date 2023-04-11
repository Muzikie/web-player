/* External dependencies */
import { useState} from 'react';
import { cryptography } from '@liskhq/lisk-client';

/* Internal dependencies */
import { useAccount } from '~/hooks/useAccount/useAccount';
import { MODULES, COMMANDS } from '~/configs';
import { useBroadcast } from './useBroadcast'



export const useCreateCollection = () => {
  const { updateAccount } = useAccount();
  const { broadcast } = useBroadcast();

  const [broadcastStatus, setBroadcastStatus] = useState({
    error: false,
    message: '',
    loading: false,
  });

  const signAndBroadcast = async (value : any) => {
    const data = await updateAccount();
    setBroadcastStatus({ error: false, message: '', loading: true });
    const result = await broadcast({
      module: MODULES.COLLECTION,
      command: COMMANDS.CREATE,
      params: {
        name: value.name,
        releaseYear: value.releaseYear,
        collectionType: value.collectionType,
        owners: [{
          address: cryptography.address.getAddressFromLisk32Address(data.address),
          shares: 100
        }]
      },
      account: data,
      files: [{ key: 'cover', value: value.files[0] }],
    });
    setBroadcastStatus({ ...result, loading: false });
  };


  return {
    signAndBroadcast,
    broadcastStatus,
  };
};
