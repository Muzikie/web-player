import React from 'react';
import Icon from '../common/Icon';
import trackImage from '../../assets/images/mocks/album7.png';
import styles from './trackRow.css';

export interface TrackType {
  name: string;
  id: string;
  image: string;
  albumId: string;
  albumName: string;
  duration: string;
  artistId: string;
  artistName: string;
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

const TrackRow = ({ data, className = '' }: TrackProps) => (
  <a
    onClick={() => { console.log('Implement the play logic.'); }}
    className={`${styles.wrapper} ${className}`}
  >
    <div className={styles.playIcon}>
      <Icon name="play" />
    </div>
    <div className={styles.albumArt}>
      <figure>
        <img src={trackImage} alt={ data.name } />
      </figure>
    </div>
    <div className={styles.info}>
      <h5 className={styles.trackName}>{ data.name }</h5>
      <h5 className={styles.albumName}>{ data.albumName }</h5>
      <span className={styles.likes}>{ formatThousands(Number(data.likes)) }</span>
      <span className={styles.duration}>{secondToMinutes(Number(data.duration))}</span>
    </div>
  </a>
);

export default TrackRow;
