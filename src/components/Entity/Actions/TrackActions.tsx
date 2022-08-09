import React from 'react';
import { formatThousands } from '../../../helpers/formatters';
import { secondToMinutes } from '../../../helpers/convertors';
import { IconButton } from '../../common/Button';
import styles from './actions.css';
import { TrackType, EntityRowProps } from '../types';

const TrackActions = ({ data }: EntityRowProps<TrackType>) => (
  <footer className={`${styles.wrapper} ${styles.track}`}>
    <IconButton
      icon="heart"
      className={styles.likeButton}
      onClick={() => console.log('Implement like functionality', data)}
    />
    <span className={styles.streamCount}>{ formatThousands(Number(data.likes)) }</span>
    <span className={styles.duration}>{secondToMinutes(Number(data.duration))}</span>
    <IconButton
      icon="more-vertical"
      className={styles.contextMenu}
      onClick={() => console.log('Implement context menu functionality', data)}
    />
  </footer>
);

export default TrackActions;
