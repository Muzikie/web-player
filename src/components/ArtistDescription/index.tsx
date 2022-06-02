import React from 'react';
import styles from './artistDescription.css';
import selena from '../../assets/images/mocks/selena-gomez.jpg';
import data from './data.json';
import { PlayButton, SecondaryButton } from '../common/button';
import Collections from '../Collection';
import MostPopular from './MostPopular';

const ArtistDescription = () => (
  <section className={styles.wrapper}>
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
      <MostPopular />
      <Collections
        className={styles.discography}
        title="Albums"
        direction="row"
        albums={data.albums}
      />
    </section>
  </section>
);

export default ArtistDescription;
