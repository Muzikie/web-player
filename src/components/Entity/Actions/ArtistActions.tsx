import React from 'react';
import styles from './actions.css';
import { ArtistType, EntityRowProps } from '../types';

const ArtistActions = ({ data }: EntityRowProps<ArtistType>) => (
  <footer className={`${styles.wrapper} ${styles.artist}`}>
    <ul>
      <li className={styles.like}></li>
      <li className={styles.stats}></li>
      <li className={styles.duration}></li>
      <li className={styles.more}></li>
    </ul>
  </footer>
);

export default ArtistActions;
