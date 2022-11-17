import { useEffect, useState } from 'react';

import { isEmpty, isNil } from '~/helpers/helpers';
import { hydrate } from '~/helpers/convertors';
import { migration } from './migration';

export const useSession = () => {
  const [session, setSession] = useState({});

  // rehydrate data from session storage
  useEffect(() => {
    const value = sessionStorage.getItem(migration.key);
    setSession(JSON.parse(value ?? '{}'));
  }, []);

  // hydrate data to session storage
  useEffect(() => {
    if (isNil(session) || isEmpty(session)) {
      sessionStorage.removeItem(migration.key);
    }
    sessionStorage.setItem(migration.key, hydrate(session));
  }, [session]);
  
  return {
    session,
    setSession,
  };
};
