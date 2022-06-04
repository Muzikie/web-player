import React from 'react';
import styles from './artistSummary.css';
import selena from '../../assets/images/mocks/selena-gomez.jpg';
import { IconButton, PlayButton } from '../common/button';
import { ArtistType } from '../ArtistRow';

interface ArtistSummaryProps {
  data: ArtistType;
}

const ArtistSummary = ({ data }: ArtistSummaryProps) => (
  <section className={styles.wrapper}>
    <figure className={styles.artistPhoto}>
      <img src={selena} alt="Selena Gomez" />
    </figure>

    <article>
      <footer>
        <PlayButton
          className={styles.play}
          onClick={() => { console.log('Create the play logic'); }}
        />
        <IconButton
          icon="heart"
          className={styles.follow}
          onClick={(e) => { console.log('Create the follow logic', e); }}
        />
      </footer>
      <div>
        <h1>{ data.name }</h1>
        <h5>{ data.description }</h5>
      </div>
    </article>
  </section>
);

export default ArtistSummary;
