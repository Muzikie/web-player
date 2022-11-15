import { isEmpty, isNil } from '~/helpers/helpers';
import { hydrate } from '~/helpers/convertors';
import { migrations } from './migrations';

export const useStorage = () => {
  const storeData = (key: string, version: number, value: any) => {
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

  const retrieveData = (key: string) => {
    const storedValue = localStorage.getItem(key);
    const data = JSON.parse(storedValue ?? '{}');
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
