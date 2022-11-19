/* External dependencies */
import React from 'react';
import { Link } from '@remix-run/react';

const ExtendedLogo = () => (
  <div className="component logo extended">
    <Link to="/">
      <figure>
        <img src="/images/logo.svg" alt="Muzikie" />
      </figure>
      <h1>Muzikie</h1>
      <sub>Decentralized Music streaming</sub>
    </Link>
  </div>
);

export default ExtendedLogo;
