/* External dependencies */
import { useMemo, useState, useEffect } from 'react';

/* Internal dependencies */
import { isEmpty, isNil } from '~/helpers/helpers';
import { hydrate, rehydrate } from '~/helpers/convertors';
import { getLocalStorage } from './getLocalStorage';
import { migrations, MIN_STORAGE_VERSION } from './migrations';
import { RetrievedValue } from './types';

export const useStorage = <Type>(key: string, defaultValue: Type) => {
  const storage = useMemo(getLocalStorage, []);
  const migration = useMemo(() =>
    migrations.find((item) => item.key === key) ?? { key, version: MIN_STORAGE_VERSION }, [key]);
  const [data, setData] = useState<Type>(defaultValue);

  const storeData = (value: Type) => {
    if (isNil(value) || isEmpty(value)) {
      storage.removeItem(key);
    } else {
      storage.setItem(key, hydrate({
        version: migration.version,
        value,
      }));
    }
  };

  // rehydrate data from session storage
  useEffect(() => {
    const storedValue = storage.getItem(key);
    const defaultForHydration: RetrievedValue<Type> = {
      value: defaultValue,
      version: migration.version,
    };
    const parseData: RetrievedValue<Type> = rehydrate(storedValue, defaultForHydration) as RetrievedValue<Type>;

    if (storedValue && migration?.migrate && migration.version > parseData.version) {
      const migrated = migration.migrate(parseData.value);
      storeData(migrated);
      setData(migrated);
    } else {
      setData(parseData.value);
    }
  }, []);

  // hydrate data to session storage
  useEffect(() => {
    storeData(data);
  }, [data]);

  return {
    data,
    storeData,
  };
};
