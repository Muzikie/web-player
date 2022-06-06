import React, { ReactElement } from 'react';
import styles from './layout.css';
import Header from '../../components/Header';
import Player from '../../components/Player';
import RecentsSidebar from '../../components/RecentsSidebar';
import MainMenu from '../../components/MainMenu';

const Layout = ({ children }: { children: ReactElement }) => {
  return (
    <div className={styles.expand}>
      <Header />
      <main className={`${styles.main} ${styles.expand}`}>
        <MainMenu />
        { children }
        <RecentsSidebar />
      </main>
      <Player />
    </div>
  );
}

export default Layout;
