import React from 'react';
import Collection from '../../components/Collection';
import AlbumSummary from '../../components/Summary/AlbumSummary';
import styles from './album.css';

import albumData from '@mock/album-data.json';
import albumTracks from '@mock/album-tracks.json';

const Album = () => (
  <section className={styles.wrapper}>
    <AlbumSummary data={albumData} />
    <Collection
      items={albumTracks}
      className={styles.trackList}
    />
  </section>
);

export default Album;
