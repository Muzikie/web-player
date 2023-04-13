/* External dependencies */
import { useState } from 'react';
import { cryptography } from '@liskhq/lisk-client';

/* Internal dependencies */
import { useAccount } from '~/hooks/useAccount/useAccount';
import {
  MODULES,
  COMMANDS,
  SocialAccountPlatform,
} from '~/configs';
import { useBroadcast } from '../useBroadcast/useBroadcast';
import { Params } from './types';

const initialValue = [
  { platform: SocialAccountPlatform.Twitter, username: '' },
  { platform: SocialAccountPlatform.Instagram, username: '' },
  { platform: SocialAccountPlatform.Youtube, username: '' },
];

export const useCreateProfile = () => {
  const { updateAccount } = useAccount();
  const { broadcast } = useBroadcast();

  const [broadcastStatus, setBroadcastStatus] = useState({
    error: false,
    message: '',
    loading: false,
  });

  const signAndBroadcast = async (formValues : Params) => {
    const data = await updateAccount();
    setBroadcastStatus({ error: false, message: '', loading: true });
    const result = await broadcast({
      module: MODULES.PROFILE,
      command: COMMANDS.CREATE,
      params: {
        name: formValues.name,
        nickName: formValues.nickName,
        description: formValues.description,
        socialAccounts: formValues.socialAccounts,
        owners: [{
          address: cryptography.address.getAddressFromLisk32Address(data.address),
          shares: 100
        }]
      },
      account: data,
      files: [
        { key: 'avatar', value: formValues.avatar[0] },
        { key: 'banner', value: formValues.banner[0] },
      ],
    });

    setBroadcastStatus({ ...result, loading: false });
  };

  return {
    signAndBroadcast,
    initialValue,
    broadcastStatus,
  };
};
