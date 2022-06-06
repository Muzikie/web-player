import React, { ReactElement } from 'react';
import styles from './layout.css';
import MenuButton from '../../components/MenuButton';
import Player from '../../components/Player';
import RecentsSidebar from '../../components/RecentsSidebar';
import MainMenu from '../../components/MainMenu';

const Layout = ({ children }: { children: ReactElement }) => {
  return (
    <div className={styles.expand}>
      <MenuButton key="in-layout" />
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
