import { createContext } from 'react';

import type { AccountContextType } from './types';

const AccountContext = createContext<AccountContextType|null>(null);

export default AccountContext;
