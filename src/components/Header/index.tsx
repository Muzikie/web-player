import React from 'react';
import logo from '../../assets/images/logo.svg';
import Icon from '../common/Icon';
import styles from './header.css';

const Header = () => (
  <header className={styles.header}>
    <div className={styles.logo}>
      <img src={logo} />
    </div>
    <div className={styles.search}>
      <input type="text" name="search" id="search" />
      <Icon name='search' />
    </div>
  </header>
);

export default Header;
