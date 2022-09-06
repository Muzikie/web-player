import React from 'react';
import { ProgressBarProps } from './type';

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
  duration > 0 ? `${(currentTime / duration) * 100}%` : '0%';

const ProgressBar = ({ currentTime, duration }: ProgressBarProps) => {
  const percentage = updateProgress(currentTime, duration);
  return (
    <section className="seek">
      <div className="bar">
        <span style={{ width: percentage }}></span>
        <i style={{ left: percentage }}></i>
      </div>
      <time>
        <span>{ formatCurrentTime(currentTime) }</span>
      </time>
    </section>
  );
};

export default ProgressBar;
