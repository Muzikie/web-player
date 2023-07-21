/* External dependencies */
import React from 'react';
import { useLocation } from 'react-router-dom';

/* Internal dependencies */
import ExtendedLogo from '../Logo/Extended';
import MainMenu from '../MainMenu';
import { ROUTES } from '~/routes/routes';

const WHITE_ROUTES = [
  ROUTES.LOGIN.location,
  ROUTES.LOGOUT.location,
  ROUTES.REGISTER.location,
  ROUTES.AGREEMENT.location,
];

const MainHeader = () => {
  const { pathname } = useLocation();
  const pullUp = WHITE_ROUTES.includes(pathname);

  return (
    <header className={`component mainHeader ${pullUp ? 'pullUp' : ''}`}>
      <div className="container">
        <ExtendedLogo />
        {
          !pullUp && (
            <MainMenu />
          )
        }
      </div>
    </header>
  );
};

export default MainHeader;
