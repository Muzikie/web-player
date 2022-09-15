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
