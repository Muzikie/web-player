import React from 'react';
import { IconButton } from '../common/button';
import styles from './header.css';

const Header = () => (
  <header className={styles.header}>
    <IconButton
      className={styles.menuButton}
      icon="more-horizontal"
      onClick={(e) => { console.log('Implement toggle menu functionality', e); }}
    />
    {/* <IconButton
      className={styles.searchButton}
      icon="search"
      onClick={(e) => { console.log('Implement toggle search functionality', e); }}
    /> */}
  </header>
);

export default Header;
