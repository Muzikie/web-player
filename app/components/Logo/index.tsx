import React from 'react';

/* Internal dependencies */
import { Link } from '~/components/common/Link';
import { LogoProps } from './types';

const Logo = ({ size = 'medium' }: LogoProps) => (
  <div className={`component logo ${size}`}>
    <figure>
      <Link to="/">
        <img src="./images/logo.svg" alt="Muzikie" />
      </Link>
    </figure>
  </div>
);

export default Logo;
