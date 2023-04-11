/* External dependencies */
import { useState, ChangeEvent, useEffect } from 'react';
import { cryptography } from '@liskhq/lisk-client';

/* Internal dependencies */
import { useAccount } from '~/hooks/useAccount/useAccount';
import {
  MODULES,
  COMMANDS,
} from '~/configs';
import { bufferize } from '~/helpers/convertors';
import { useBroadcast } from './useBroadcast';



export const useCreateAudio = () => {
  const { updateAccount } = useAccount();
  const { broadcast } = useBroadcast();
  const [broadcastStatus, setBroadcastStatus] = useState({
    error: false,
    message: '',
    loading: false,
  });
  
  const signAndBroadcast = async (value: any) => {
    const data = await updateAccount();
    setBroadcastStatus({ error: false, message: '', loading: true });
    const result = await broadcast({
      module: MODULES.AUDIO,
      command: COMMANDS.CREATE,
      params: {
        name: value.name,
        releaseYear: value.releaseYear,
        fit: [],
        genre: [value.genre],
        collectionID: bufferize(value.collectionID),
        owners: [{
          address: cryptography.address.getAddressFromLisk32Address(data.address),
          shares: 100
        }]
      },
      account: data,
      files: [{ key: 'audio', value: value.files[0] }],
    });
    setBroadcastStatus({ ...result, loading: false });
  };


  return {
    signAndBroadcast,
    broadcastStatus,
  };
};
