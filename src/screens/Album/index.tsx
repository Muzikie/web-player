import React from 'react';
import Collection from '../../components/Collection';
import AlbumSummary from '../../components/Album/AlbumSummary';
import styles from './album.css';

import albumData from '@mock/album-data.json';
import albumTracks from '@mock/album-tracks.json';

const Album = () => (
  <section className={styles.wrapper}>
    <AlbumSummary data={albumData} />
    <Collection
      tracks={albumTracks}
      className={styles.trackList}
    />
  </section>
);

export default Album;
