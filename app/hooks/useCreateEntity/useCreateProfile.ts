/* External dependencies */
import { useState } from 'react';

/* Internal dependencies */
import { uploadFiles } from '~/models/entity.client';
import { useAccount } from '~/hooks/useAccount/useAccount';
import {
  MODULES,
  COMMANDS,
  SocialAccount,
  Profile,
  SUFFIXES,
} from '~/configs';
import { useBroadcast } from '../useBroadcast/useBroadcast';
import { getFileSignatures } from '../useBroadcast/utils';
import { Params } from './types';
import { bufferize } from '~/helpers/convertors';

export const useCreateProfile = () => {
  const { account } = useAccount();
  const { broadcast } = useBroadcast();

  const [broadcastStatus, setBroadcastStatus] = useState({
    error: false,
    message: '',
    loading: false,
  });

  const signAndBroadcast = async (formValues : Params, profile: Profile) => {
    setBroadcastStatus({ error: false, message: '', loading: true });

    // Create if doesn't exist, update if it does
    const command = profile.profileID ? COMMANDS.SET_ATTRIBUTES : COMMANDS.CREATE;
    const commandSpecificParams = profile.profileID
      ? { profileID: bufferize(profile.profileID) }
      : {};

    const avatarSignatureAndHash = (formValues.avatar as File[])[0]
      ? await getFileSignatures([{ key: SUFFIXES.profile.primary, value: (formValues.avatar as File[])[0] }], account)
      : { avatarHash: bufferize(profile.avatarHash), avatarSignature: bufferize(profile.avatarSignature) };

    const bannerSignatureAndHash = (formValues.banner as File[])[0]
      ? await getFileSignatures([{ key: SUFFIXES.profile.secondary, value: (formValues.banner as File[])[0] }], account)
      : { bannerHash: bufferize(profile.bannerHash), bannerSignature: bufferize(profile.bannerSignature) };

    const result = await broadcast({
      module: MODULES.PROFILE,
      command,
      params: {
        name: formValues.name,
        nickName: formValues.nickName,
        description: formValues.description,
        socialAccounts: (formValues.socialAccounts as SocialAccount[]).filter((item) => !!item.username),
        ...commandSpecificParams,
        ...avatarSignatureAndHash,
        ...bannerSignatureAndHash,
      },
      account,
    });
 
    // upload files
    const files = [
      { key: SUFFIXES.profile.primary, value: (formValues.avatar as File[])[0] },
      { key: SUFFIXES.profile.secondary, value: (formValues.banner as File[])[0] },
    ];
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
