import React, { useState, createContext, useEffect } from 'react';
import { PlayerContextType, PlayerProviderProps, PlayerState, Current } from './types';
import useLocalStorage from '~/hooks/useLocalStorage';
import { TrackType } from '~/components/Entity/types';

export const PlayerContext = createContext<PlayerContextType>({
  current: null,
  isPlaying: false,
  setIsPlaying: (state: boolean) => { console.log('Methods are not ready.', state); },
  setCurrent: (data: Current) => { console.log('Methods are not ready.', data); },
});

const PlayerProvider = ({ children }: PlayerProviderProps) => {
  const [storedState, setStoredState] = useLocalStorage<PlayerState>('playerState', {
    current: null,
    isPlaying: false,
  });
  const [current, setCurrent] = useState<TrackType|null>(storedState.current);
  const [isPlaying, setIsPlaying] = useState<boolean>(storedState.isPlaying);

  useEffect(() => {
    setStoredState({
      current,
      isPlaying: false,
    });
  }, [current]);

  const value = {
    current,
    isPlaying,
    setIsPlaying,
    setCurrent,
  };

  return (
    <PlayerContext.Provider value={value}>
      {children}
    </PlayerContext.Provider>
  );
};

export default PlayerProvider;
