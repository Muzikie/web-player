import React from 'react';
import styles from './layout.css';
import Header from '../components/Header';
import Player from '../components/Player';
import RecentsSidebar from '../components/RecentsSidebar';
import UserCollections from '../components/UserCollections';
import Artist from '../screens/Artist/index';

function App() {
  return (
    <div className={styles.expand}>
      <Header />
      <main className={`${styles.main} ${styles.expand}`}>
        <UserCollections />
        <Artist />
        <RecentsSidebar />
      </main>
      <Player />
    </div>
  );
}

export default App;
