import { useEffect, useState, useMemo } from 'react';

import { isEmpty, isNil } from '~/helpers/helpers';
import { hydrate } from '~/helpers/convertors';
import { getSessionStorage } from './getSessionStorage';
import { migration } from './migration';

const defaultSession = {
  address: '',
  publicKey: '',
};

export const useSession = () => {
  const storage = useMemo(getSessionStorage, []);
  const [session, setSession] = useState(defaultSession);

  // rehydrate data from session storage
  useEffect(() => {
    const storedValue = storage.getItem(migration.key);
    const parsedValue = storedValue ? JSON.parse(storedValue) : defaultSession;
    setSession(parsedValue);
  }, []);

  // hydrate data to session storage
  useEffect(() => {
    if (isNil(session) || isEmpty(session)) {
      storage.removeItem(migration.key);
    }
    storage.setItem(migration.key, hydrate(session));
  }, [session]);
  
  return {
    session,
    setSession,
  };
};
