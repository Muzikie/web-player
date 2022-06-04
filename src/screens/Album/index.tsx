import React from 'react';
import styles from './album.css';
import albumData from './album-data.json';
import albumTracks from './album-tracks.json';
import artistAlbums from './albums.json';
import Collections from '../../components/Collection';
import TrackList from '../../components/TrackList';
import AlbumSummary from '../../components/AlbumSummary';
// import { TrackType } from '../../components/TrackRow';
// import { AlbumType } from '../../components/AlbumRow';
// import { ArtistType } from '../../components/ArtistRow';

// interface data {
//   artist: ArtistType,
//   mostPopular: TrackType[],
//   albums: AlbumType[],
// }

const Album = () => (
  <section className={styles.wrapper}>
    <AlbumSummary data={albumData} />
    <TrackList
      data={albumTracks}
    />
    <Collections
      className={styles.discography}
      title={`Other Albums by ${albumData.artistName}`}
      direction="row"
      albums={artistAlbums}
    />
  </section>
);

export default Album;
