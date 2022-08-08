import React from 'react';
import { IconButton } from '../../common/Button';
import styles from './actions.css';
import { AlbumType, EntityRowProps } from '../types';

const AlbumActions = ({ data }: EntityRowProps<AlbumType>) => (
  <footer className={`${styles.wrapper} ${styles.album}`}>
    <ul>
      <IconButton
        icon="heart"
        className={styles.likeButton}
        onClick={() => console.log('Implement like functionality')}
      />
      <IconButton
        icon="more-vertical"
        className={styles.contextMenu}
        onClick={() => console.log('Implement context menu functionality')}
      />
    </ul>
  </footer>
);

export default AlbumActions;
