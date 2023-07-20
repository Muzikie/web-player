/* External dependencies */
import React from 'react';
import { useLocation } from 'react-router-dom';

/* Internal dependencies */
import ExtendedLogo from '../Logo/Extended';
import MainMenu from '../MainMenu';
import { ROUTES, ROUTE_TYPES, getRouteByPath } from '~/routes/routes';

const MainHeader = () => {
  const { pathname } = useLocation();
  const route = getRouteByPath(pathname);
  const pullUp = route.type === ROUTE_TYPES.PUBLIC || pathname === ROUTES.LOGOUT.location;

  return (
    <header className={`component mainHeader ${pullUp ? 'pullUp' : ''}`}>
      <div className="container">
        <ExtendedLogo />
        {
          route.type === ROUTE_TYPES.PRIVATE && (
            <MainMenu />
          )
        }
      </div>
    </header>
  );
};

export default MainHeader;
