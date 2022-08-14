import React, { ReactElement } from 'react';
import styles from './layout.css';
import MainMenu from '../../components/MainMenu';
import Player from '../../components/Player';

const Layout = ({ children }: { children: ReactElement }) => {
  return (
    <div className={styles.expand}>
      <MainMenu />
      <main className={`${styles.main} ${styles.expand}`}>
        { children }
      </main>
      <Player />
    </div>
  );
}

export default Layout;
