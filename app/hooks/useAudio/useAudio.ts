import {
  useEffect,
  useState,
  MutableRefObject,
  useContext,
} from 'react';
import { PlayerContext } from '~/context/playerContext/playerContextProvider';

export const useAudio = (audioRef: MutableRefObject<HTMLAudioElement>) => {
  const {
    isPlaying,
    setIsPlaying,
  } = useContext(PlayerContext);
  const [progress, setProgress] = useState(0);

  const playPause = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const onTimeUpdate = () => {
    setProgress(audioRef.current.currentTime);
  };

  useEffect(() => {
    const timeDiff =  Math.abs(Math.round(progress) - Math.round(audioRef.current.currentTime));
    if (progress !== audioRef.current.currentTime && timeDiff > 2) {
      audioRef.current.currentTime = progress;
    }
  }, [progress]);

  useEffect(() => {
    audioRef.current.addEventListener('ended', () => setIsPlaying(false));
    return () => {
      audioRef.current.removeEventListener('ended', () => setIsPlaying(false));
    };
  }, []);

  return {
    playPause,
    onTimeUpdate,
    progress,
    setProgress,
  };
};
