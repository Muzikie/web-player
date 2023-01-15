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
  const [duration, setDuration] = useState(0);
  const onAudioEnd = () => {
    setIsPlaying(false);
  };

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

  const onLoadedData = (e: ProgressEvent<HTMLAudioElement>) => {
    setProgress(0);
    setDuration(Math.floor(e.target?.duration ?? 0));
    audioRef.current.play();
    setIsPlaying(true);
  };

  // Implements seek functionality
  useEffect(() => {
    const timeDiff =  Math.abs(Math.round(progress) - Math.round(audioRef.current.currentTime));
    if (progress !== audioRef.current.currentTime && timeDiff > 2) {
      audioRef.current.currentTime = progress;
    }
  }, [progress]);

  useEffect(() => {
    audioRef.current.addEventListener('ended', onAudioEnd);
    audioRef.current.addEventListener('loadeddata', onLoadedData as (this: HTMLAudioElement, ev: Event) => void);
    return () => {
      audioRef.current?.removeEventListener('ended', onAudioEnd);
    };
  }, []);

  return {
    playPause,
    onTimeUpdate,
    progress,
    duration,
    setProgress,
  };
};
