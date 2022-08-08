import React from 'react';
import Collection from '../../components/Collection';
import { greet } from '../../helpers/helpers';
import styles from './home.css';

import myPlaylists from '@mock/similar-playlist.json';
import playlistData from '@mock/album-tracks.json';
import artists from '@mock/similar-artists.json';
import albums from '@mock/artist-albums.json';

const Home = () => (
  <section className={styles.wrapper}>
    <header>
      <h2>{greet()}</h2>
    </header>
    <Collection
      className={styles.playlists}
      title="Playlists"
      itemTheme="minimal"
      itemsPerColumn="2"
      items={myPlaylists}
    />
    <Collection
      className={styles.recent}
      title="Recent"
      itemTheme="minimal"
      itemsPerColumn="2"
      items={playlistData}
    />
    <Collection
      className={styles.favorite}
      title="Favorite"
      itemTheme="minimal"
      itemsPerColumn="2"
      items={albums}
    />
    <Collection
      className={styles.favorite}
      title="Favorite"
      itemTheme="minimal"
      itemsPerColumn="2"
      items={artists}
    />
  </section>
);

export default Home;
