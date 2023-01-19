import React, { useState, createContext, useEffect } from 'react';

import { METHOD_NOT_READY } from '~/configs/app';
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

const ProfileProvider = ({ children, sessionData }: ProfileProviderProps) => {
  const [info, setInfo] = useState<ProfileInfoType>(defaultValue.info);
  const [secretKey, setSecretKey] = useState<string>('');

  const setProfileInfo = (data: Partial<ProfileInfoType>) => {
    setInfo({
      ...info,
      ...data,
    });
  };

  useEffect(() => {
    if (info.address !== sessionData.address) {
      setInfo(sessionData);
    }
  }, [sessionData]);

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
