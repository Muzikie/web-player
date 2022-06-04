import React from 'react';
import styles from './artist.css';
import artistData from './artist-data.json';
import artistAlbums from './artist-albums.json';
import Collections from '../../components/Collection';
import TrackList from '../../components/TrackList';
import ArtistSummary from '../../components/ArtistSummary';
// import { TrackType } from '../../components/TrackRow';
// import { AlbumType } from '../../components/AlbumRow';
// import { ArtistType } from '../../components/ArtistRow';

// interface data {
//   artist: ArtistType,
//   mostPopular: TrackType[],
//   albums: AlbumType[],
// }

const Artist = () => (
  <section className={styles.wrapper}>
    <ArtistSummary data={artistData} />
    <TrackList
      title="Most popular"
      data={artistData.mostPopular}
    />
    <Collections
      className={styles.discography}
      title="Albums"
      direction="row"
      albums={artistAlbums}
    />
  </section>
);

export default Artist;
