import React from 'react';
import { Link } from 'wouter';
import logo from '../../assets/images/logo.svg';
import styles from './logo.css';
import { LogoProps } from './types';

const Logo = ({ size = 'medium' }: LogoProps) => (
  <div className={`${styles.wrapper} ${styles[size]}`}>
    <figure>
      <Link href="/">
        <img src={logo} alt="Free Muse" />
      </Link>
    </figure>
  </div>
);

export default Logo;
