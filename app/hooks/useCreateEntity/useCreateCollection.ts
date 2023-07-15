/* External dependencies */
import { useState } from 'react';

/* Internal dependencies */
import { uploadFiles } from '~/models/entity.client';
import { useAccount } from '~/hooks/useAccount/useAccount';
import { MODULES, COMMANDS, SUFFIXES } from '~/configs';
import { useBroadcast } from '../useBroadcast/useBroadcast';
import { getFileSignatures } from '../useBroadcast/utils';
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
    const account = await updateAccount();
    setBroadcastStatus({ error: false, message: '', loading: true });

    const files = [{ key: SUFFIXES.collection.primary, value: (formValues.files as File[])[0] }];
    const coverSignatureAndHash = await getFileSignatures(files, account);

    const result = await broadcast({
      module: MODULES.COLLECTION,
      command: COMMANDS.CREATE,
      params: {
        name: formValues.name,
        releaseYear: formValues.releaseYear,
        collectionType: formValues.collectionType,
        ...coverSignatureAndHash,
      },
      account,
    });

    const uploadResponse = await uploadFiles(result.entityID as string, files);
    const uploadSuccess = uploadResponse.reduce((acc, curr) => {
      if (curr.error === true || !acc) {
        acc = false;
      }
      return acc;
    }, true);
    // @todo React upon upload failure
    console.log('uploadSuccess', uploadSuccess);
    setBroadcastStatus({ ...result, loading: false });
  };

  return {
    signAndBroadcast,
    broadcastStatus,
  };
};
