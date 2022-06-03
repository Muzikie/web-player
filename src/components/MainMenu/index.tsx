import React from 'react';
import { IconLink } from '../common/Link';
import UserCollections from '../UserCollections';
import styles from './mainMenu.css';

const MainMenu = () => (
  <aside className={styles.wrapper}>
    <div>
      <IconLink
        icon="home"
        target="home"
        className={styles.menuItem}
      />
      <IconLink
        icon="settings"
        target="settings"
        className={styles.menuItem}
      />
      <IconLink
        icon="profile"
        target="profile"
        className={styles.menuItem}
      />
    </div>
    <UserCollections />
  </aside>
);

export default MainMenu;
