import { useContext } from 'react';

/* Internal dependencies */
import { ProfileContext } from '~/context/profileContext/profileContextProvider';
import { getAuth, getTokenBalances } from '~/models/entity.client';

export const useAccount = () => {
  const { info, setProfileInfo } = useContext(ProfileContext);

  const updateAccount = async () => {
    const { data: auth } = await getAuth({ params: { address: info.address } });
    const { data: balances } = await getTokenBalances({ params: { address: info.address } });
    const data = {
      ...info,
      balances,
      auth,
    };

    setProfileInfo(data);
    return data;
  };

  return {
    info,
    setProfileInfo,
    updateAccount,
  };
};
