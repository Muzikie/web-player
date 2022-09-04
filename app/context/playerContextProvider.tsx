import React, { useState, createContext, MouseEvent } from 'react';
import { PlayerContextType, PlayerProviderProps } from './types';
import { TrackType } from '~/components/Entity/types';

export const PlayerContext = createContext<PlayerContextType>({
  current: null,
  queue: [],
  setCurrent: (track: TrackType|null) => { console.log('Methods are not ready.', track); },
  addToQueue: (track: TrackType) => { console.log('Methods are not ready.', track); },
  removeFromQueue: (track: TrackType) => { console.log('Methods are not ready.', track); },
  prevTrack: (e: MouseEvent) => { console.log('Methods are not ready.', e); },
  nextTrack: (e: MouseEvent) => { console.log('Methods are not ready.', e); },
});

const PlayerProvider = ({ children }: PlayerProviderProps) => {
  const [current, setCurrent] = useState<TrackType|null>(null);
  const [queue, setQueue] = useState<TrackType[]>([]);

  const addToQueue = (track: TrackType) => {
    setQueue([...queue, track]);
  };

  const removeFromQueue = (track: TrackType) => {
    const newQueue = queue.filter((t) => t.id !== track.id);
    setQueue(newQueue);
  };

  const nextTrack = (e: MouseEvent) => {
    e.preventDefault();
    const next = queue[0];
    setCurrent(next);
    removeFromQueue(next);
  };

  const prevTrack = (e: MouseEvent) => {
    e.preventDefault();
    const prev = queue[queue.length - 1];
    setCurrent(prev);
    removeFromQueue(prev);
  };

  const value = {
    current,
    queue,
    setCurrent,
    addToQueue,
    removeFromQueue,
    prevTrack,
    nextTrack,
  };

  return (
    <PlayerContext.Provider value={value}>
      {children}
    </PlayerContext.Provider>
  );
};

export default PlayerProvider;
