import React from 'react';
import styles from './artistSummary.css';
import selena from '@mock/selena-gomez.jpg';
import { IconButton } from '../../common/Button';
import { EntityRowProps, ArtistType } from '../../Entity/types';

const ArtistSummary = ({ data }: EntityRowProps<ArtistType>) => (
  <section className={styles.wrapper}>
    <header>
      <h1>{ data.name }</h1>
      <h4 className={styles.releaseDate}>{ data.description }</h4>
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
      <img src={selena} alt="Selena Gomez" />
    </figure>
  </section>
);

export default ArtistSummary;
