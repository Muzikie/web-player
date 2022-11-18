import { ReactElement } from 'react';

export interface ProfileInfoType {
  address: string;
  publicKey: string;
}

export interface ProfileContextType {
  info: ProfileInfoType;
  secretKey: string;
  setProfileInfo: (data: ProfileInfoType) => void;
  setSecretKey: (data: string) => void;
}

export interface ProfileProviderProps {
  children: ReactElement;
}
