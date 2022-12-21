import { ReactElement } from 'react';

export interface ProfileInfoType {
  address: string;
  publicKey: string;
  privateKey: string;
  nonce: bigint;
  balance: bigint;
}

export interface ProfileContextType {
  info: ProfileInfoType;
  secretKey: string;
  setProfileInfo: (data: Partial<ProfileInfoType>) => void;
  setSecretKey: (data: string) => void;
}

export interface ProfileProviderProps {
  children: ReactElement;
}
