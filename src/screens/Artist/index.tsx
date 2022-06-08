import React from 'react';
import styles from './artist.css';
import artistData from './artist-data.json';
import artistAlbums from './artist-albums.json';
import similarArtists from './similar-artists.json';
import Collections from '../../components/Collection';
import TrackList from '../../components/TrackList';
import ArtistSummary from '../../components/ArtistSummary';

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
    <Collections
      className={styles.similarArtists}
      title="Similar artists"
      direction="row"
      itemTheme="smallRow"
      artists={similarArtists}
    />
  </section>
);

export default Artist;
