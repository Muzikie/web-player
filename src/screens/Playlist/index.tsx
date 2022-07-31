import React from 'react';
import styles from './playlist.css';
import Collection from '../../components/Collection';
import PlaylistSummary from '../../components/Playlist/PlaylistSummary';

import playlistData from '@mock/playlist-data.json';

const Playlist = () => (
  <section className={styles.wrapper}>
    <PlaylistSummary
      data={playlistData} 
    />
    <Collection
      className={styles.trackList}
      tracks={playlistData.tracks}
    />
  </section>
);

export default Playlist;
