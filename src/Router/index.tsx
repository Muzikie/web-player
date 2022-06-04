import React from 'react';
import styles from './layout.css';
import Header from '../components/Header';
import Player from '../components/Player';
import RecentsSidebar from '../components/RecentsSidebar';
import MainMenu from '../components/MainMenu';
import Album from '../screens/Album';

function App () {
  return (
    <div className={styles.expand}>
      <Header />
      <main className={`${styles.main} ${styles.expand}`}>
        <MainMenu />
        <Album />
        <RecentsSidebar />
      </main>
      <Player />
    </div>
  );
}

export default App;
