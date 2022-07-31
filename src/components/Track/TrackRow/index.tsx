import React from 'react';
import { formatThousands } from '../../../helpers/formatters';
import { secondToMinutes } from '../../../helpers/convertors';
import { IconButton } from '../../common/Button';
import { TrackRowProps } from '../types';
import styles from './trackRow.css';

const TrackRow = ({ data, className = '', theme = 'normal' }: TrackRowProps) => (
  <section
    onClick={() => { console.log('Implement the play logic.'); }}
    className={`${styles.wrapper} ${styles[theme]} ${className}`}
  >
    <div className={styles.primaryInfo}>
      <div className={styles.text}>
        <h4 className={styles.trackName}>{ data.name }</h4>
        <h5 className={styles.albumName}>{ data.albumName }</h5>
      </div>
    </div>
    <div className={styles.extraInfo}>
      <IconButton
        icon="heart"
        className={styles.likeButton}
        onClick={() => console.log('Implement like functionality')}
      />
      <span className={styles.streamCount}>{ formatThousands(Number(data.likes)) }</span>
      <span className={styles.duration}>{secondToMinutes(Number(data.duration))}</span>
      <IconButton
        icon="more-vertical"
        className={styles.contextMenu}
        onClick={() => console.log('Implement context menu functionality')}
      />
    </div>
  </section>
);

export default TrackRow;
