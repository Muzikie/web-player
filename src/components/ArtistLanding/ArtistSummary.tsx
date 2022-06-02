import React from 'react';
import styles from './artistLanding.css';
import selena from '../../assets/images/mocks/selena-gomez.jpg';
import { PlayButton, SecondaryButton } from '../common/button';
import { ArtistType } from '../ArtistRow';

interface ArtistDescriptionProps {
  data: ArtistType;
}

const ArtistDescription = ({ data }: ArtistDescriptionProps) => (
  <section className={styles.description}>
    <figure className={styles.artistPhoto}>
      <img src={selena} alt="Selena Gomez" />
    </figure>

    <article>
      <pre>STATION</pre>
      <h1>{ data.name }</h1>
      <p>{ data.description }</p>

      <footer>
        <PlayButton
          className={styles.play}
          onClick={() => { console.log('Create the play logic'); }}
        />
        <SecondaryButton
          className={styles.follow}
          onClick={() => { console.log('Create the follow logic'); }}
        >
          + Follow
        </SecondaryButton>
      </footer>
    </article>
  </section>
);

export default ArtistDescription;
