import { useContext } from 'react';

/* Internal dependencies */
import { ProfileContext } from '~/context/profileContext/profileContextProvider';
import { getAuth, getTokenBalances } from '~/models/entity.client';

export const useAccount = () => {
  const { info, setProfileInfo } = useContext(ProfileContext);
  console.log('info', info);

  const updateAccount = async () => {
    const { data: auth } = await getAuth({ params: { address: info.address } });
    const { data: token } = await getTokenBalances({ params: { address: info.address } });
    const data = {
      ...info,
      token,
      auth,
    };
    console.log('data', data);

    setProfileInfo(data);
    return data;
  };

  return {
    info,
    setProfileInfo,
    updateAccount,
  };
};
