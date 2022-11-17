import { useMemo } from 'react';

import { isEmpty, isNil } from '~/helpers/helpers';
import { hydrate } from '~/helpers/convertors';
import { getLocalStorage } from './getLocalStorage';
import { migrations } from './migrations';
import { RetrievedValue } from './types';

export const useStorage = <Type>() => {
  const storage = useMemo(getLocalStorage, []);

  const storeData = (key: string, version: number, value: Type) => {
    const data = {
      version,
      value,
    };

    if (isNil(value) || isEmpty(value)) {
      storage.removeItem(key);
    } else {
      storage.setItem(key, hydrate(data));
    }
  };

  const retrieveData = (key: string, defaultValue: Type) => {
    const storedValue = storage.getItem(key);
    const parseData: RetrievedValue<Type> = storedValue ? JSON.parse(storedValue) : { value: defaultValue };
    const migration = migrations.find((item) => item.key === key);

    if (storedValue && migration?.migrate && migration.version > parseData.version) {
      const migrated = migration.migrate(parseData.value);
      storeData(key, migration.version, migrated);
      return migrated;
    }

    return parseData.value;
  };

  return {
    storeData,
    retrieveData,
  };
};
