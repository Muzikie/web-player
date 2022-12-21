import React, { useState, createContext } from 'react';
import { ProfileInfoType, ProfileContextType, ProfileProviderProps } from './types';

const defaultValue = {
  info: {
    address: '',
    publicKey: '',
    privateKey: '',
    nonce: BigInt(0),
    balance: BigInt(0),
  },
  secretKey: '',
  setProfileInfo: (data: Partial<ProfileInfoType>) => { console.log('Methods are not ready.', data); },
  setSecretKey: (data: string) => { console.log('Methods are not ready.', data); },
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
