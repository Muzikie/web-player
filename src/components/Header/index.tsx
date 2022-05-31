import React from 'react';
import logo from '../../assets/images/logo.svg';
import styles from './header.css';

const Header = () => (
  <header className={styles.header}>
    <ul>
      <li className={styles.logo}>
        <img src={logo} />
      </li>
      <li><a>Home</a></li>
      <li><a>Upload</a></li>
      <li><a>Search</a></li>
    </ul>
  </header>
);

export default Header;
