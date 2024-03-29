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
  const { account } = useAccount();
  const { broadcast } = useBroadcast();

  const [broadcastStatus, setBroadcastStatus] = useState({
    error: false,
    message: '',
    loading: false,
  });

  const signAndBroadcast = async (formValues: Params) => {
    setBroadcastStatus({ error: false, message: '', loading: true });

    const files = [{ key: SUFFIXES.collection.primary, value: (formValues.files as File[])[0] }];
    const coverSignatureAndHash = await getFileSignatures(files, account);

    const result = await broadcast({
      module: MODULES.COLLECTION,
      command: COMMANDS.CREATE,
      params: {
        name: formValues.name,
        releaseYear: formValues.releaseYear,
        collectionType: Number(formValues.collectionType),
        ...coverSignatureAndHash,
      },
      account,
    });

    if (result.error) {
      return setBroadcastStatus({ ...result, loading: false });
    }
    // @todo React upon upload failure
    await uploadFiles(result.entityID as string, files);
    return setBroadcastStatus({ ...result, loading: false });
  };

  return {
    signAndBroadcast,
    broadcastStatus,
  };
};
