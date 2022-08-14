import React from 'react';
import styles from './artist.css';
import Collection from '../../components/Collection';
import ArtistSummary from '../../components/Summary/ArtistSummary';

import artistData from '@mock/artist-data.json';
import artistAlbums from '@mock/artist-albums.json';

const Artist = () => (
  <section className={styles.wrapper}>
    <ArtistSummary data={artistData} />
    <Collection
      title="Popular"
      items={artistData.mostPopular}
      className={styles.popularTracks}
    />
    <Collection
      title="Discography"
      items={artistAlbums}
      className={styles.discography}
    />
  </section>
);

export default Artist;
