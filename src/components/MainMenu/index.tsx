import React from 'react';
import { IconLink } from '../common/Link';
import UserCollections from '../UserCollections';
import logo from '../../assets/images/logo.svg';
import styles from './mainMenu.css';

const MainMenu = () => (
  <aside className={styles.wrapper}>
    <div className={styles.logo}>
      <a href="/">
        <img src={logo} alt="Free Muse" />
      </a>
    </div>
    <div className={styles.list}>
      <IconLink
        icon="home"
        target="home"
        className={`${styles.menuItem} ${styles.active}`}
      />
      <IconLink
        icon="search"
        target="search"
        className={styles.menuItem}
      />
      <IconLink
        icon="user"
        target="profile"
        className={styles.menuItem}
      />
      <IconLink
        icon="settings"
        target="settings"
        className={styles.menuItem}
      />
    </div>
    <UserCollections />
  </aside>
);

export default MainMenu;
