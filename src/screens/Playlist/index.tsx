import React from 'react';
import styles from './playlist.css';
import playlistData from './playlist-data.json';
import similarPlaylists from './similar-playlist.json';
import fromAboveArtists from '../Artist/artist-albums.json';
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
      className={styles.discoverPlaylists}
      title="Discover playlists"
      direction="row"
      playlists={similarPlaylists}
    />
    <Collections
      className={styles.fromAboveArtists}
      title="From above artists"
      direction="row"
      itemTheme="smallRow"
      albums={fromAboveArtists}
    />
  </section>
);

export default Playlist;
