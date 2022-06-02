import React from 'react';
import Track, { TrackType } from '../TrackRow';
import styles from './mostPopular.css';

interface MostPopularProps {
  data: TrackType[]
}

const MostPopular = ({ data }: MostPopularProps) => (
  <section className={styles.wrapper}>
    <div>
      <h2>Most popular</h2>
      <section className={styles.list}>
        {
          data.map((track: TrackType) => (
            <Track data={track} key={track.id} />
          ))
        }
      </section>
    </div>
  </section>
);

export default MostPopular;
