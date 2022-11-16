import { isEmpty, isNil } from '~/helpers/helpers';
import { hydrate } from '~/helpers/convertors';
import { migrations } from './migrations';
import { RetrievedValue } from './types';

export const useStorage = <Type>() => {
  const storeData = (key: string, version: number, value: Type) => {
    const data = {
      version,
      value,
    };

    if (isNil(value) || isEmpty(value)) {
      localStorage.removeItem(key);
    } else {
      localStorage.setItem(key, hydrate(data));
    }
  };

  const retrieveData = (key: string, defaultValue: Type) => {
    const storedValue = localStorage.getItem(key) ?? '';
    const data: RetrievedValue<Type> = JSON.parse(storedValue) ?? defaultValue;
    const migration = migrations.find((item) => item.key === key);
    
    if (migration) {
      const { version, migrate } = migration;
      if (data?.version === version || !migrate) {
        return data.value;
      }
      const migrated = migrate(data.value);
      storeData(key, version, migrated);
      return migrated;
    }
  };
  
  return {
    storeData,
    retrieveData,
  };
};
