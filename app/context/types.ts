import { ReactElement, MouseEvent } from 'react';
import { TrackType } from '../components/Entity/types';

export interface PlayerContextType {
  current: TrackType|null;
  queue: TrackType[];
  isPlaying: boolean;
  setIsPlaying: (state: boolean) => void;
  setCurrent: (track: TrackType|null) => void;
  addToQueue: (track: TrackType) => void;
  removeFromQueue: (track: TrackType) => void;
  prevTrack: (e: MouseEvent) => void;
  nextTrack: (e: MouseEvent) => void;
}

export interface PlayerProviderProps {
  children: ReactElement;
}

export interface PlayerState {
  current: TrackType|null;
  queue: TrackType[];
}

export interface ProfileInfoType {
  address: string;
  publicKey: string;
}

export interface ProfileContextType {
  info: ProfileInfoType;
  secretKey: string;
  setProfileInfo: (data: ProfileInfoType) => void;
  setSecretKey: (data: string) => void;
}

export interface ProfileProviderProps {
  children: ReactElement;
}

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
