import React from 'react';
import Collection from '../../components/Collection';
import Logo from '../../components/Logo';
import { greet } from '../../helpers/helpers';
import { entityThemes } from '../../components/Entity/types';
import { collectionThemes } from '../../components/Collection/types';
import styles from './home.css';

import recents from '@mock/recents.json';
import myPlaylists from '@mock/similar-playlist.json';
import artists from '@mock/similar-artists.json';
import albums from '@mock/artist-albums.json';

const Home = () => (
  <section className={styles.wrapper}>
    <header>
      <Logo size="large" />
      <h2>{greet()}</h2>
    </header>
    <Collection
      className={styles.playlists}
      title="Playlists"
      itemTheme={entityThemes.large}
      theme={collectionThemes.normal}
      items={myPlaylists}
    />
    <Collection
      className={styles.recent}
      title="Recent"
      itemTheme={entityThemes.minimal}
      items={recents}
    />
    <Collection
      className={styles.favorite}
      title="Favorite"
      itemTheme={entityThemes.minimal}
      items={albums}
    />
    <Collection
      className={styles.favorite}
      title="Favorite"
      itemTheme={entityThemes.minimal}
      items={artists}
    />
  </section>
);

export default Home;
