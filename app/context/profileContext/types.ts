import { ReactElement } from 'react';

export interface TokenBalance {
  tokenID: string;
  availableBalance: string;
  lockedBalances: string[];
}

export interface ProfileInfoType {
  address: string;
  publicKey: string;
  privateKey: string;
  nonce: string;
  balances: TokenBalance[];
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
