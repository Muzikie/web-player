/* External dependencies */
import React, { useState, createContext } from 'react';

/* Internal dependencies */
import { useStorage } from '~/hooks/useStorage';
import { SettingsType, SettingsContextType, SettingsProviderProps } from './types';

export const SettingsContext = createContext<SettingsContextType>({
  settings: {
    theme: 'light',
    agreement: false,
  },
  updateSettings: (data: SettingsType) => { console.log('Methods are not ready.', data); },
});

const SettingsProvider = ({ children }: SettingsProviderProps) => {
  const { storeData, retrieveData } = useStorage<SettingsType>();
  const storedSettings: SettingsType = retrieveData('@settings', {
    theme: 'light',
    agreement: false,
  });
  
  const [settings, setSettings] = useState<SettingsType>(storedSettings);

  const updateSettings = (data: SettingsType) => {
    storeData('@settings', 1, data);
    setSettings(data);
  };

  const value = {
    settings,
    updateSettings,
  };

  return (
    <SettingsContext.Provider value={value}>
      {children}
    </SettingsContext.Provider>
  );
};

export default SettingsProvider;
