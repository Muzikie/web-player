import React, { useState, createContext, useEffect } from 'react';

import { useSession } from '~/hooks/useSession';
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
  const { session, setSession } = useSession();
  const [info, setInfo] = useState<ProfileInfoType>(session);
  const [secretKey, setSecretKey] = useState<string>('');

  const setProfileInfo = (data: ProfileInfoType) => {
    // @todo validate profile info
    setInfo(data);
    setSession(data);
  };

  useEffect(() => {
    setInfo(session);
  }, [session])

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
