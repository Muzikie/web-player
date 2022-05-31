import React from 'react';
import Header from '../../components/Header';
import Player from '../../components/Player';
import RecentsSidebar from '../../components/RecentsSidebar';
import UserCollections from '../../components/UserCollections';
import ArtistFull from '../../components/ArtistFull';
import styles from './artist.css';

const Artist = () => {
  return (
    <div className={styles.expand}>
      <Header />
      <main className={styles.main}>
        <UserCollections />
        <ArtistFull />
        <RecentsSidebar />
      </main>
      <Player />
    </div>
  );
}

export default Artist;
