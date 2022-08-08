import React from 'react';
import styles from './playlistSummary.css';
import selena from '@mock/selena-gomez.jpg';
import { IconButton } from '../../common/Button';
import { EntityRowProps, PlaylistType } from '../../Entity/types';

const PlaylistSummary = ({ data }: EntityRowProps<PlaylistType>) => (
  <section className={styles.wrapper}>
    <header>
      <h1>{ data.name }</h1>
      <div className={styles.actionButtons}>
        <IconButton
          icon="play"
          theme="primary medium"
          className={styles.play}
          onClick={() => { console.log('Create the play logic'); }}
        />
        <IconButton
          icon="heart"
          theme="outlined small"
          className={styles.follow}
          onClick={(e) => { console.log('Create the follow logic', e); }}
        />
      </div>
    </header>
    <figure className={styles.photo}>
      <img src={selena} alt={ data.name } />
    </figure>
  </section>
);

export default PlaylistSummary;
