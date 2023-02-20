/* External dependencies */
import React from 'react';

/* Internal dependencies */
import { Link } from '~/components/common/Link';

const ExtendedLogo = () => (
  <div className="component logo extended">
    <Link to="/">
      <figure>
        <img src="/images/logo.svg" alt="Muzikie" />
      </figure>
      <h1>Muzikie</h1>
    </Link>
  </div>
);

export default ExtendedLogo;
