import React from 'react';
import { IconButton } from '../../common/Button';
import styles from './actions.css';
import { ArtistType, EntityRowProps } from '../types';

const ArtistActions = ({ data }: EntityRowProps<ArtistType>) => (
  <footer className={`${styles.wrapper} ${styles.artist}`}>
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

export default ArtistActions;
