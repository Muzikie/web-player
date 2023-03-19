/* External dependencies */
import { useState, ChangeEvent, useEffect } from 'react';
import { cryptography } from '@liskhq/lisk-client';

/* Internal dependencies */
import { useAccount } from '~/hooks/useAccount/useAccount';
import {
  MODULES,
  COMMANDS,
  SocialAccountPlatform,
  socialPlatformNames,
  SocialAccount,
} from '~/configs';

import { ValidationStatus } from './types';
import { validate } from './validator';

import { useBroadcast } from './useBroadcast'

export const useCreateProfile = () => {
  const { updateAccount } = useAccount();
  const { broadcast } = useBroadcast();

  const initialValue = [
    { platform: SocialAccountPlatform.Twitter, username: 'reyraa' },
    { platform: SocialAccountPlatform.Instagram, username: 'reyraa' },
    { platform: SocialAccountPlatform.Youtube, username: 'reyraa' },
  ];

  const [formValidity, setFormValidity] = useState<ValidationStatus>(ValidationStatus.clean);
  const [nickName, setNickName] = useState<string>('Reyraa');
  const [name, setName] = useState<string>('Ali');
  const [description, setDescription] = useState<string>('Lorem ipsum dolor sit amet, consectetur adipiscing elit.');
  const [socialAccounts, setSocialAccounts] = useState<SocialAccount[]>(initialValue);
  const [banner, setBanner] = useState<FileList | null>(null);
  const [avatar, setAvatar] = useState<FileList | null>(null);
  const [broadcastStatus, setBroadcastStatus] = useState({ error: false, message: '' });

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    switch (e.target.name) {
    case 'name':
      setName(e.target.value);
      break;
    case 'nickName':
      setNickName(e.target.value);
      break;
    case 'description':
      setDescription(e.target.value);
      break;
    case 'banner':
      setBanner(e.target.files ?? null);
      break;
    case 'avatar':
      setAvatar(e.target.files ?? null);
      break;
    case 'youtube':
      setSocialAccounts(
        socialAccounts.map(({ platform, username }) => {
          if (socialPlatformNames[platform] === e.target.name) {
            return { platform, username: e.target.value };
          }
          return { platform, username };
        }),
      );
      break;
    case 'instagram':
      setSocialAccounts(
        socialAccounts.map(({ platform, username }) => {
          if (socialPlatformNames[platform] === e.target.name) {
            return { platform, username: e.target.value };
          }
          return { platform, username };
        }),
      );
      break;
    case 'twitter':
      setSocialAccounts(
        socialAccounts.map(({ platform, username }) => {
          if (socialPlatformNames[platform] === e.target.name) {
            return { platform, username: e.target.value };
          }
          return { platform, username };
        }),
      );
      break;
    default:
      break;
    }
  };

  const signAndBroadcast = async () => {
    const data = await updateAccount();
    const result = await broadcast({
      module: MODULES.PROFILE,
      command: COMMANDS.CREATE,
      params: {
        name,
        nickName,
        description,
        socialAccounts,
        owners: [{
          address: cryptography.address.getAddressFromLisk32Address(data.address),
          shares: 100
        }]
      },
      account: data,
      files: [
        { key: 'avatar', value: avatar[0] },
        { key: 'banner', value: banner[0] },
      ],
    });

    setBroadcastStatus(result);
  };

  useEffect(() => {
    validate('profile', {
      nickName,
      description,
      socialAccounts,
      avatar,
      banner
    }).then((result: ValidationStatus) => {
      setFormValidity(result);
    });
  }, [nickName, description, socialAccounts, avatar, banner]);

  return {
    name,
    nickName,
    description,
    socialAccounts,
    onChange,
    signAndBroadcast,
    formValidity,
    broadcastStatus,
  };
};
