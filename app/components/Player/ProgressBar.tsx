import React, { ChangeEvent } from 'react';
import { ProgressBarProps } from './type';

const range = {
  max: 100,
  min: 0,
};

const zeroPad = (num: number) => num.toString().padStart(2, '0');

const formatCurrentTime = (currentTime: number) => {
  const hours = Math.floor(currentTime / 3600);
  const minutes = Math.floor((currentTime - hours * 3600) / 60);
  const seconds = Math.floor(currentTime - hours * 3600 - minutes * 60);
  if (hours > 0) {
    return `${hours}:${zeroPad(minutes)}:${zeroPad(seconds)}`;
  }
  return `${zeroPad(minutes)}:${zeroPad(seconds)}`;
};

const updateProgress = (currentTime: number, duration: number) =>
  duration > 0 ? 100 * currentTime / duration : 0;

const ProgressBar = ({ progress, duration, setProgress }: ProgressBarProps) => {
  const percentage = updateProgress(progress, duration);

  const onSeek = (e: ChangeEvent<HTMLAudioElement>) => {
    setProgress(e.target.value * duration / range.max);
  };

  return (
    <section className="seek">
      <input
        type="range"
        min={range.min}
        max={range.max}
        onChange={onSeek}
        value={percentage}
      />
      <time>
        <span>{ formatCurrentTime(progress) }</span>
      </time>
    </section>
  );
};

export default ProgressBar;
