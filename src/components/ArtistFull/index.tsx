import React from 'react';
import styles from './artistFull.css';
import selena from '../../assets/images/mocks/selena-gomez.jpg';
import data from './data.json';
import { PlayButton, SecondaryButton } from '../common/button';
import MostPopular from './MostPopular';

const ArtistFull = () => (
  <section className={styles.wrapper}>
    <section className={styles.description}>
      <figure className={styles.artistPhoto}>
        <img src={selena} alt="Selena Gomez" />
      </figure>

      <article>
        <pre>STATION</pre>
        <h1>{ data.name }</h1>
        <div>
          <p>{ data.description }</p>
        </div>

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
      <MostPopular />
    </section>
  </section>
);

export default ArtistFull;
