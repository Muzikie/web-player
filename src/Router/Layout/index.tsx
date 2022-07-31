import React, { ReactElement } from 'react';
import styles from './layout.css';
import MenuButton from '../../components/MenuButton';
import Player from '../../components/Player';

const Layout = ({ children }: { children: ReactElement }) => {
  return (
    <div className={styles.expand}>
      <MenuButton key="in-layout" />
      <main className={`${styles.main} ${styles.expand}`}>
        { children }
      </main>
      <Player />
    </div>
  );
}

export default Layout;
