import React from 'react';
import { IconButton } from '../../common/Button';
import { getYear } from '../../../helpers/formatters';
import styles from './actions.css';
import { AlbumType, EntityRowProps } from '../types';

const AlbumActions = ({ data }: EntityRowProps<AlbumType>) => (
  <footer className={`${styles.wrapper} ${styles.album}`}>
    <span>{getYear(data.releaseDate)}</span>
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

export default AlbumActions;
