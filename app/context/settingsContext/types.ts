import { ReactElement } from 'react';

export interface SettingsType {
  theme: string;
  agreement: boolean;
}
export interface SettingsContextType {
  settings: SettingsType;
  updateSettings: (data: SettingsType) => void;
}
export interface SettingsProviderProps {
  children: ReactElement;
}
