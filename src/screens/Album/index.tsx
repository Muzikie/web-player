import React from 'react';
import styles from './album.css';
import albumData from './album-data.json';
import albumTracks from './album-tracks.json';
import artistAlbums from './albums.json';
import similarArtists from '../Artist/similar-artists.json';
import Collections from '../../components/Collection';
import TrackList from '../../components/TrackList';
import AlbumSummary from '../../components/AlbumSummary';

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
    <Collections
      className={styles.similarArtists}
      title="Similar artists"
      direction="row"
      itemTheme="smallRow"
      artists={similarArtists}
    />
  </section>
);

export default Album;
