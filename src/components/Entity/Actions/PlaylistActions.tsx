import React from 'react';
import styles from './actions.css';
import { PlaylistType, EntityRowProps } from '../types';

const PlaylistActions = ({ data }: EntityRowProps<PlaylistType>) => (
  <footer className={`${styles.wrapper} ${styles.playlist}`} />
);

export default PlaylistActions;
