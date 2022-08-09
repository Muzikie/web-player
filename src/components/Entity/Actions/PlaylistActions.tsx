import React from 'react';
import { IconButton } from '../../common/Button';
import styles from './actions.css';
import { PlaylistType, EntityRowProps } from '../types';

const PlaylistActions = ({ data }: EntityRowProps<PlaylistType>) => (
  <footer className={`${styles.wrapper} ${styles.playlist}`}>
    <span>{`${data.tracks.length} tracks`}</span>
    <IconButton
      icon="heart"
      className={styles.likeButton}
      onClick={() => console.log('Implement like functionality', data)}
    />
    <IconButton
      icon="more-vertical"
      className={styles.contextMenu}
      onClick={() => console.log('Implement context menu functionality', data)}
    />
  </footer>
);

export default PlaylistActions;
