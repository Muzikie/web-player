import React from 'react';
import logo from '../../assets/images/logo.svg';

const Header = () => (
  <header className="header">
    <ul>
      <li className="logo">
        <img src={logo} />
      </li>
      <li><a>Home</a></li>
      <li><a></a></li>
      <li><a>Upload</a></li>
      <li><a>Search</a></li>
    </ul>
  </header>
);

export default Header;
