import React from 'react';
import { useLocation } from 'react-router-dom';
/* Internal dependencies */
import { Link } from '~/components/common/Link';
import { ROUTES } from '~/routes/routes';
import { LogoProps } from './types';

const Logo = ({ size = 'medium' }: LogoProps) => {
  const { pathname } = useLocation();
  return (
    <div className={`component logo ${size}`}>
      <figure>
        <Link
          to={ROUTES.HOME}
          disabled={pathname === '/agreement'}
        >
          <img src="./images/logo.svg" alt="Muzikie" />
        </Link>
      </figure>
    </div>
  );
};

export default Logo;
