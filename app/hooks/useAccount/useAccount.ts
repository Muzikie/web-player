import { useContext } from 'react';

/* Internal dependencies */
import { useWS } from '~/hooks/useWS/useWS';
import { ProfileContext } from '~/context/profileContext/profileContextProvider';
import { Method, AuthResponse, TokenResponse } from '../useWS/types';

export const useAccount = () => {
  const { info, setProfileInfo } = useContext(ProfileContext);
  const { request } = useWS();

  const updateAccount = async () => {
    const auth = <AuthResponse> await request(Method.auth_getAuthAccount, { address: info.address });
    const token = <TokenResponse> await request(Method.token_getBalances, { address: info.address });
    const data = { ...info };
    if (!auth.error) {
      setProfileInfo({ nonce: auth.data.nonce });
      data.nonce = auth.data.nonce;
    }
    if (!token.error) {
      setProfileInfo(token.data);
      data.balances = token.data.balances;
    }

    return data;
  };

  return {
    info,
    setProfileInfo,
    updateAccount,
  };
};
