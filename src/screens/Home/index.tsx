import React from 'react';
import Collection from '../../components/Collection';
import styles from './home.css';

import myPlaylists from '@mock/similar-playlist.json';
import playlistData from '@mock/album-tracks.json';
import albums from '@mock/artist-albums.json';

const Home = () => (
  <section className={styles.wrapper}>
    <header>
      <h2>Discover</h2>
    </header>
    <Collection
      className={styles.playlists}
      title="Playlists"
      direction="horizontal"
      playlists={myPlaylists}
    />
    <Collection
      className={styles.recent}
      title="Recent"
      itemTheme="minimal"
      itemsPerColumn="2"
      tracks={playlistData}
    />
    <Collection
      className={styles.favorite}
      title="Favorite"
      itemTheme="minimal"
      itemsPerColumn="2"
      albums={albums}
    />
  </section>
);

export default Home;
