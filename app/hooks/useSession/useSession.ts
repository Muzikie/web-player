import { useEffect, useState, useMemo } from 'react';

import { hydrate } from '~/helpers/convertors';
import { getSessionStorage } from './getSessionStorage';
import { migration } from './migration';
import { Session } from './types';

const defaultSession = {
  address: '',
  publicKey: '',
};

export const useSession = () => {
  const storage = useMemo(getSessionStorage, []);
  const [session, setSession] = useState<Session>(defaultSession);

  // rehydrate data from session storage
  useEffect(() => {
    const storedValue = storage.getItem(migration.key);
    const parsedValue = storedValue ? JSON.parse(storedValue) : defaultSession;
    setSession(parsedValue);
  }, []);

  // hydrate data to session storage
  useEffect(() => {
    storage.setItem(migration.key, hydrate(session));
  }, [session]);
  
  return {
    session,
    setSession,
  };
};
