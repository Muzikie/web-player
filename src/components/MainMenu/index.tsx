import React from 'react';
import { Link } from 'wouter';
import { IconLink } from '../common/Link';
import UserCollections from '../UserCollections';
import logo from '../../assets/images/logo.svg';
import styles from './mainMenu.css';

const MainMenu = () => (
  <aside className={styles.wrapper}>
    <div className={styles.logo}>
      <figure>
        <Link href="/">
          <img src={logo} alt="Free Muse" />
        </Link>
      </figure>
    </div>
    <div className={styles.list}>
      <IconLink
        icon="home"
        href="/"
        className={`${styles.menuItem} ${styles.active}`}
      />
      <IconLink
        icon="search"
        href="?modal=search"
        className={styles.menuItem}
      />
      <IconLink
        icon="user"
        href="/profile"
        className={styles.menuItem}
      />
      <IconLink
        icon="settings"
        href="/settings"
        className={styles.menuItem}
      />
    </div>
    <UserCollections />
  </aside>
);

export default MainMenu;
