import { ReactElement } from 'react';
import { TrackType } from '../../components/Entity/types';

export type Current = TrackType|null;

export interface PlayerContextType {
  current:Current;
  isPlaying: boolean;
  setIsPlaying: (state: boolean) => void;
  setCurrent: (track: Current) => void;
}

export interface PlayerProviderProps {
  children: ReactElement;
}

export interface PlayerState {
  current: Current;
  isPlaying: boolean;
}
