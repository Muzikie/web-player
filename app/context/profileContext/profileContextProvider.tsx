import React, { useState, createContext } from 'react';
import { ProfileInfoType, ProfileContextType, ProfileProviderProps } from './types';

const defaultValue = {
  info: {
    address: '',
    publicKey: '',
    privateKey: '',
  },
  secretKey: '',
  setProfileInfo: (data: ProfileInfoType) => { console.log('Methods are not ready.', data); },
  setSecretKey: (data: string) => { console.log('Methods are not ready.', data); },
};

export const ProfileContext = createContext<ProfileContextType>(defaultValue);

const ProfileProvider = ({ children }: ProfileProviderProps) => {
  const [info, setInfo] = useState<ProfileInfoType>(defaultValue.info);
  const [secretKey, setSecretKey] = useState<string>('');

  const setProfileInfo = (data: ProfileInfoType) => {
    setInfo(data);
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
