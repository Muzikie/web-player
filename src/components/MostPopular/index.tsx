import React from 'react';
import TrackRow, { TrackType } from '../TrackRow';
import styles from './mostPopular.css';

interface MostPopularProps {
  data: TrackType[],
  className?: string;
}

const MostPopular = ({ data, className = '' }: MostPopularProps) => (
  <section className={`${styles.wrapper} ${className}`}>
    <div>
      <h4>Most popular</h4>
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

export default MostPopular;
