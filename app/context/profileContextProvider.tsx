import React, { useState, createContext } from 'react';
import { ProfileInfoType, ProfileContextType, ProfileProviderProps } from './types';

export const ProfileContext = createContext<ProfileContextType>({
  info: {
    address: '',
    publicKey: '',
  },
  secretKey: '',
  setProfileInfo: (data: ProfileInfoType) => { console.log('Methods are not ready.', data); },
  setSecretKey: (data: string) => { console.log('Methods are not ready.', data); },
});

const ProfileProvider = ({ children }: ProfileProviderProps) => {
  const [info, setInfo] = useState<ProfileInfoType>({
    address: '',
    publicKey: '',
  });
  const [secretKey, setSecretKey] = useState<string>('');

  const setProfileInfo = (data: ProfileInfoType) => {
    // @todo validate profile info
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
