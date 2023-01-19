import { ReactElement } from 'react';
import { Audio } from '~/configs/types';

export type Current = Audio|null;

export interface PlayerContextType {
  current:Current;
  isPlaying: boolean;
  setIsPlaying: (state: boolean) => void;
  setCurrent: (audio: Current) => void;
}

export interface PlayerProviderProps {
  children: ReactElement;
}

export interface PlayerState {
  current: Current;
  isPlaying: boolean;
}
