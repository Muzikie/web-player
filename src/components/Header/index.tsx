import React from 'react';
// import logo from '../../assets/images/logo.svg';
import { IconButton } from '../common/button';
import Icon from '../common/Icon';
import styles from './header.css';

const Header = () => (
  <header className={styles.header}>
    <IconButton
      className={styles.menuButton}
      icon="more-horizontal"
      onClick={(e) => { console.log('Implement toggle menu functionality', e); }}
    />
    <div className={styles.search}>
      <input type="text" name="search" id="search" />
      <Icon name='search' />
    </div>
  </header>
);

export default Header;
