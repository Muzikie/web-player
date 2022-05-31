import React from 'react';
import { IconButton } from '../common/button';
import trackImage from '../../assets/images/mocks/album7.png';
import styles from './track.css';

export interface TrackType {
  title: string;
  albumId: string;
  albumName: string;
  duration: string;
  likes: string;
}

interface TrackProps {
  data: TrackType;
  className?: string;
}

const formatThousands = (num: number): string => {
  const si = [
    {value: 1E3, sign: 'K'},
    {value: 1E6, sign: 'M'},
    {value: 1E9, sign: 'B'},
    {value: 1E12, sign: 'T'},
    {value: 1E15, sign: 'P'},
    {value: 1E18, sign: 'E'}
  ];

  const signItem = si.find((item) => (num >= item.value));
  return !signItem
    ? num.toString()
    : (num / signItem.value).toFixed(2).replace(/\.0+$|(\.[0-9]*[1-9])0+$/, '$1') + signItem.sign;
};

const secondToMinutes = (seconds: number): string => {
  const mins = Math.floor(seconds / 60);
  const sec = Math.floor(seconds % 60);

  return `${mins}:${sec}`;
};

const Track = ({ data, className = '' }: TrackProps) => (
  <section className={`${styles.wrapper} ${className}`}>
    <IconButton
      className={styles.playButton}
      icon="play"
      onClick={() => { console.log('Implement play logic.'); }}
    />
    <div className={styles.albumArt}>
      <figure>
        <img src={trackImage} alt={ data.title } />
      </figure>
    </div>
    <h4>{ data.title }</h4>
    <h4>{ data.albumName }</h4>
    <div className={styles.likes}>
      <IconButton
        icon="like"
        onClick={() => { console.log('Implement like logic.'); }}
      />
      <span>{ formatThousands(Number(data.likes)) }</span>
    </div>
    <span className={styles.duration}>{secondToMinutes(Number(data.duration))}</span>
  </section>
);

export default Track;
