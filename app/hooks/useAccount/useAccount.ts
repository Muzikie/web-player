import { useContext, useEffect, useState } from 'react';

/* Internal dependencies */
import { ProfileContext } from '~/context/profileContext/profileContextProvider';
import { getAuth, getTokenBalances } from '~/models/entity.client';

export const useAccount = () => {
  const { info, setProfileInfo } = useContext(ProfileContext);
  const [isAccountLoaded, setISAccountLoaded] = useState(false);

  const updateAccount = async () => {
    setISAccountLoaded(true);
    const auth = await getAuth({ params: { address: info.address } });
    const { data: token } = await getTokenBalances({ params: { address: info.address } });
    const data = {
      ...info,
      token,
      auth,
    };
    setProfileInfo(data);
    return data;
  };

  useEffect(() => {
    if(info.address !== '' && !isAccountLoaded) {
      updateAccount();
    }
  }, [info]);

  return {
    info,
    setProfileInfo,
    updateAccount,
  };
};
