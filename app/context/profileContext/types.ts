import { ReactElement } from 'react';
import { Auth,Balance } from '~/configs/types';

export interface TokenBalance {
  tokenID: string;
  availableBalance: string;
  lockedBalances: string[];
}

export interface ProfileInfoType {
  address: string;
  publicKey: string;
  privateKey: string;
  auth: Auth;
  token: Balance[];
}

export interface ProfileContextType {
  info: ProfileInfoType;
  secretKey: string;
  setProfileInfo: (data: Partial<ProfileInfoType>) => void;
  setSecretKey: (data: string) => void;
}

export interface ProfileProviderProps {
  children: ReactElement;
  sessionData: ProfileInfoType;
}
