import React from 'react';
import TrackRow, { TrackType } from '../TrackRow';
import styles from './trackList.css';

interface TrackListProps {
  data: TrackType[],
  title?: string;
  className?: string;
}

const TrackList = ({ title, data, className = '' }: TrackListProps) => (
  <section className={`${styles.wrapper} ${className}`}>
    <div>
      {
        title ? (
          <h4>{ title }</h4>
        ) : null
      }
      <section className={styles.list}>
        {
          data.map((track: TrackType) => (
            <TrackRow data={track} key={track.id} />
          ))
        }
      </section>
    </div>
  </section>
);

export default TrackList;
