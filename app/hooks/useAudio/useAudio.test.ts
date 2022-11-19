import { MutableRefObject } from 'react';
import { renderHook, act } from '@testing-library/react-hooks';
import { useAudio } from './useAudio';

describe('useAudio', () => {
  const audioRef = {
    current: document.createElement('audio'),
  } as MutableRefObject<HTMLAudioElement>;

  it('should return a function to play/pause the audio', () => {
    const { result } = renderHook(() => useAudio(audioRef));
    act(() => {
      expect(result.current.playPause).toBeDefined();
      result.current.playPause();
      expect(audioRef.current.paused).not.toBeFalsy();
    });
  });

  it('should pause the audio when the audio is ended', () => {
    renderHook(() => useAudio(audioRef));
    act(() => {
      audioRef.current.dispatchEvent(new Event('ended'));
      expect(audioRef.current.paused).not.toBeFalsy();
    });
  });
});
