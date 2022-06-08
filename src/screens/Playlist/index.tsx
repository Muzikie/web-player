import React from 'react';
import styles from './playlist.css';
import playlistData from './playlist-data.json';
import similarPlaylists from './similar-playlist.json';
import similarArtists from '../Artist/similar-artists.json';
import Collections from '../../components/Collection';
import TrackList from '../../components/TrackList';
import PlaylistSummary from '../../components/PlaylistSummary';

const Playlist = () => (
  <section className={styles.wrapper}>
    <PlaylistSummary data={playlistData} />
    <TrackList
      title="Tracks"
      data={playlistData.tracks}
    />
    <Collections
      className={styles.discography}
      title="Albums"
      direction="row"
      albums={similarPlaylists}
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

export default Playlist;
