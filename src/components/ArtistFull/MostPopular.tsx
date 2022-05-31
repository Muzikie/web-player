import React from 'react';
import Track, { TrackType } from '../Track';
import styles from './artistFull.css';
import data from './data.json';

const MostPopular = () => (
  <section className={styles.mostPopular}>
    <div className={styles.container}>
      <h2>Most popular</h2>
      <section className={styles.list}>
        {
          data.mostPopular.map((track: TrackType) => (
            <Track data={track} key={track.title} />
          ))
        }
      </section>
    </div>
  </section>
);

export default MostPopular;
