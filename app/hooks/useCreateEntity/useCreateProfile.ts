/* External dependencies */
import { useState, ChangeEvent, useEffect } from 'react';
import { cryptography } from '@liskhq/lisk-client';

/* Internal dependencies */
import { useAccount } from '~/hooks/useAccount/useAccount';
import {
  MODULES,
  COMMANDS,
  SocialAccountPlatform,
  SocialAccount,
} from '~/configs';

import { ValidationStatus } from './types';
import { validate } from './validator';

import { useBroadcast } from './useBroadcast'

export const useCreateProfile = () => {
  const { updateAccount } = useAccount();
  const { broadcast } = useBroadcast();

  const platforms = Object.keys(SocialAccountPlatform);
  const initialValue = [
    { platform: SocialAccountPlatform.Twitter, username: '' },
    { platform: SocialAccountPlatform.Instagram, username: '' },
    { platform: SocialAccountPlatform.Youtube, username: '' },
  ];

  const [status, setStatus] = useState<ValidationStatus>(ValidationStatus.clean);
  const [nickName, setNickName] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [socialAccounts, setSocialAccounts] = useState<SocialAccount[]>(initialValue);
  const [uploadBanner, setUploadBanner] = useState<FileList | null>(null);
  const [uploadAvatar, setUploadAvatar] = useState<FileList | null>(null);
  const [feedback, setFeedback] = useState({ error: false, message: '' });


  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    switch (e.target.name) {
    case 'nickName':
      setNickName(e.target.value);
      break;
    case 'description':
      setDescription(e.target.value);
      break;
    case 'uploadBanner':
      setUploadBanner(e.target.files ?? null);
      break;
    case 'uploadAvatar':
      setUploadAvatar(e.target.files ?? null);
      break;
    case 'youtube':
      setSocialAccounts(
        socialAccounts.map(({ platform, username }) => {
          if (platforms[platform] === e.target.name)
            return { platform, username: e.target.value };
          return { platform, username };
        }),
      );
      break;
    case 'instagram':
      setSocialAccounts(
        socialAccounts.map(({ platform, username }) => {
          if (platforms[platform] === e.target.name)
            return { platform, username: e.target.value };
          return { platform, username };
        }),
      );
      break;
    case 'twitter':
      setSocialAccounts(
        socialAccounts.map(({ platform, username }) => {
          if (platforms[platform] === e.target.name)
            return { platform, username: e.target.value };
          return { platform, username };
        }),
      );
      break;
    default:
      break;
    }
  };

  if(!uploadAvatar || !uploadBanner) {
    return false
  }
  const signAndBroadcast = async () => {
    const data = await updateAccount();
    const result = await broadcast({
      module: MODULES.PROFILE,
      command: COMMANDS.CREATE,
      params: {
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
        { key: 'avatar', value: uploadAvatar[0] },
        { key: 'banner', value: uploadBanner[0] },
      ],
    });

    setFeedback(result);
  };

  useEffect(() => {
    validate('profile', {
      nickName,
      description,
      socialAccounts,
      uploadAvatar,
      uploadBanner
    }).then((result: ValidationStatus) => {
      setStatus(result);
    });
  }, [nickName, description, socialAccounts, uploadAvatar]);

  return {
    nickName,
    description,
    socialAccounts,
    onChange,
    signAndBroadcast,
    status,
    feedback,
  };
};
