import React, { useState, createContext, useEffect } from 'react';

import { useStorage, STORAGE_KEYS } from '~/hooks/useStorage';
import { Audio } from '~/configs';
import { PlayerContextType, PlayerProviderProps, PlayerState, Current } from './types';

export const PlayerContext = createContext<PlayerContextType>({
  current: null,
  isPlaying: false,
  setIsPlaying: (state: boolean) => { console.log('Methods are not ready.', state); },
  setCurrent: (data: Current) => { console.log('Methods are not ready.', data); },
});

const PlayerProvider = ({ children }: PlayerProviderProps) => {
  const { data, storeData } = useStorage<PlayerState>(STORAGE_KEYS.PLAYER_STATE, {
    current: null,
    isPlaying: false,
  });
  const [current, setCurrent] = useState<Audio|null>(data.current);
  const [isPlaying, setIsPlaying] = useState<boolean>(data.isPlaying);

  useEffect(() => {
    storeData({
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
