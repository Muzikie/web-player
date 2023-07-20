import { ReactElement } from 'react';

import { Account } from '~/configs/types';

export interface AccountContextType {
  account: Account;
  isLoggedIn: boolean;
}

export interface AccountProviderProps {
  children: ReactElement;
  passphrase: string;
}