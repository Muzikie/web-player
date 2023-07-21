import { createContext } from 'react';

import type { AccountContextType } from './types';
import { Account } from '~/configs';

const AccountContext = createContext<AccountContextType>({
  account: {} as Account,
  isLoggedIn: false,
});

export default AccountContext;
