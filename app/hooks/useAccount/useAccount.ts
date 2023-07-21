import { useContext } from 'react';

/* Internal dependencies */
import AccountContext from '~/context/accountContext/accountContext';
import { AccountContextType } from '~/context/accountContext/types';

export const useAccount = (): AccountContextType => {
  const { account, isLoggedIn } = useContext(AccountContext);

  return {
    account, isLoggedIn,
  };
};
