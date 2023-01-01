import React, { useState, createContext } from 'react';

import { METHOD_NOT_READY } from '~/constants/app';
import { ProfileInfoType, ProfileContextType, ProfileProviderProps } from './types';

const defaultValue = {
  info: {
    address: '',
    publicKey: '',
    privateKey: '',
    nonce: '0',
    balances: [],
  },
  secretKey: '',
  setProfileInfo: (data: Partial<ProfileInfoType>) => { console.log(METHOD_NOT_READY, data); },
  setSecretKey: (data: string) => { console.log(METHOD_NOT_READY, data); },
};

export const ProfileContext = createContext<ProfileContextType>(defaultValue);

const ProfileProvider = ({ children }: ProfileProviderProps) => {
  const [info, setInfo] = useState<ProfileInfoType>(defaultValue.info);
  const [secretKey, setSecretKey] = useState<string>('');

  const setProfileInfo = (data: Partial<ProfileInfoType>) => {
    setInfo({
      ...info,
      ...data,
    });
  };

  const value = {
    secretKey,
    info,
    setProfileInfo,
    setSecretKey,
  };

  return (
    <ProfileContext.Provider value={value}>
      {children}
    </ProfileContext.Provider>
  );
};

export default ProfileProvider;
