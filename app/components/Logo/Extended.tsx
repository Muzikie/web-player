/* External dependencies */
import React from 'react';
import { useLocation } from 'react-router-dom';
/* Internal dependencies */
import { Link } from '~/components/common/Link';
import { ROUTES } from '~/routes/routes';

const ExtendedLogo = () => {
  const { pathname } = useLocation();
  return (
    <div className="component logo extended">
      <Link to={pathname === '/agreement' ? ROUTES.AGREEMENT : ROUTES.HOME}>
        <figure>
          <img src="/images/logo.svg" alt="Muzikie" />
        </figure>
        <h1>Muzikie</h1>
      </Link>
    </div>
  );
}


export default ExtendedLogo;
