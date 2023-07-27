/* External dependencies */
import { useState } from 'react';
import { cryptography } from '@liskhq/lisk-client';

/* Internal dependencies */
import { uploadFiles } from '~/models/entity.client';
import { useAccount } from '~/hooks/useAccount/useAccount';
import { MODULES, COMMANDS, SUFFIXES, LoyaltyOwner } from '~/configs';
import { useBroadcast } from '../useBroadcast/useBroadcast';
import { getFileSignatures } from '../useBroadcast/utils';
import { bufferize } from '~/helpers/convertors';
import { Params } from './types';

export const useCreateAudio = () => {
  const { account } = useAccount();
  const { broadcast } = useBroadcast();

  const [broadcastStatus, setBroadcastStatus] = useState({
    error: false,
    message: '',
    loading: false,
  });

  const signAndBroadcast = async (formValues: Params) => {
    setBroadcastStatus({ error: false, message: '', loading: true });

    const files = [{ key: SUFFIXES.audio.secondary, value: (formValues.files as File[])[0] }];
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
        owners: (formValues.owners as LoyaltyOwner[]).map((owner) => ({
          address: cryptography.address.getAddressFromLisk32Address(owner.address),
          shares: owner.shares,
        })),
        ...audioSignatureAndHash,
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
