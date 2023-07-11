/* External dependencies */
import { useState } from 'react';
import { cryptography } from '@liskhq/lisk-client';

/* Internal dependencies */
import { uploadFiles } from '~/models/entity.client';
import { useAccount } from '~/hooks/useAccount/useAccount';
import { getEntityIDFromEvents } from '~/helpers/transaction';
import { MODULES, COMMANDS, FILES } from '~/configs';
import { useBroadcast } from '../useBroadcast/useBroadcast';
import { getFileSignatures } from '../useBroadcast/utils';
import { bufferize } from '~/helpers/convertors';
import { Params } from './types';

export const useCreateAudio = () => {
  const { updateAccount } = useAccount();
  const { broadcast } = useBroadcast();

  const [broadcastStatus, setBroadcastStatus] = useState({
    error: false,
    message: '',
    loading: false,
  });

  const signAndBroadcast = async (formValues: Params) => {
    const account = await updateAccount();
    setBroadcastStatus({ error: false, message: '', loading: true });

    const files = [{ key: FILES.audio.secondary, value: (formValues.files as File[])[0] }];
    const audioSignatureAndHash = await getFileSignatures(files, account);

    const result = await broadcast({
      module: MODULES.AUDIO,
      command: COMMANDS.CREATE,
      params: {
        name: formValues.name,
        releaseYear: formValues.releaseYear,
        fit: [],
        genre: [formValues.genre],
        collectionID: bufferize(formValues.collectionID),
        owners: [{
          address: cryptography.address.getAddressFromLisk32Address(account.address),
          shares: 100
        }],
        ...audioSignatureAndHash,
      },
      account,
    });
    const entityID = getEntityIDFromEvents(MODULES.AUDIO, result.events || []);

    const uploadResponse = await uploadFiles(entityID, files);
    const uploadSuccess = uploadResponse.reduce((acc, curr) => {
      if (curr.error === true || !acc) {
        acc = false;
      }
      return acc;
    }, true);
    setBroadcastStatus({ ...result, loading: false });
  };

  return {
    signAndBroadcast,
    broadcastStatus,
  };
};
