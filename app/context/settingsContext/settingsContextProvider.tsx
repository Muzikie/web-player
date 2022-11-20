/* External dependencies */
import React, { createContext } from 'react';

/* Internal dependencies */
import { useStorage, STORAGE_KEYS } from '~/hooks/useStorage';
import { SettingsType, SettingsContextType, SettingsProviderProps } from './types';

export const SettingsContext = createContext<SettingsContextType>({
  settings: {
    theme: 'light',
    agreement: false,
  },
  updateSettings: (data: SettingsType) => { console.log('Methods are not ready.', data); },
});

const SettingsProvider = ({ children }: SettingsProviderProps) => {
  const { storeData, data } = useStorage<SettingsType>(STORAGE_KEYS.SETTINGS, {
    theme: 'light',
    agreement: false,
  });

  const updateSettings = (data: SettingsType) => {
    storeData(data);
  };

  const value = {
    settings: data,
    updateSettings,
  };

  return (
    <SettingsContext.Provider value={value}>
      {children}
    </SettingsContext.Provider>
  );
};

export default SettingsProvider;
