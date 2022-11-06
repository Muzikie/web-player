import React, { useState, createContext, MouseEvent, useEffect } from 'react';
import { PlayerContextType, PlayerProviderProps, PlayerState, Current } from './types';
import useLocalStorage from '~/hooks/useLocalStorage';
import { TrackType } from '~/components/Entity/types';

export const PlayerContext = createContext<PlayerContextType>({
  current: null,
  queue: [],
  isPlaying: false,
  setIsPlaying: (state: boolean) => { console.log('Methods are not ready.', state); },
  setCurrent: (data: Current) => { console.log('Methods are not ready.', data); },
  addToQueue: (track: TrackType) => { console.log('Methods are not ready.', track); },
  removeFromQueue: (track: TrackType) => { console.log('Methods are not ready.', track); },
  prevTrack: (e: MouseEvent) => { console.log('Methods are not ready.', e); },
  nextTrack: (e: MouseEvent) => { console.log('Methods are not ready.', e); },
});

const PlayerProvider = ({ children }: PlayerProviderProps) => {
  const [storedQueue, setStoredQueue] = useLocalStorage<PlayerState>('playerState', {
    current: null,
    queue: [],
  });
  const [current, setCurrent] = useState<TrackType|null>();
  const [queue, setQueue] = useState<TrackType[]>([]);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);

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

  useEffect(() => {
    setStoredQueue({
      current,
      queue,
    });
  }, [current, queue]);

  const value = {
    current,
    queue,
    isPlaying,
    setIsPlaying,
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
