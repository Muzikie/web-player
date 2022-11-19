/* External dependencies */
import React from 'react';
import { useLocation } from 'react-router-dom';

/* Internal dependencies */
import ExtendedLogo from '../Logo/Extended';
import MainMenu from '../MainMenu';

const MainHeader = () => {
  const { pathname } = useLocation();
  const pageType = pathname === '/login' || pathname === '/register' ? 'public' : 'private';

  return (
    <header className={`component mainHeader ${pageType}`}>
      <div className="container">
        <ExtendedLogo />
        <MainMenu />
      </div>
    </header>
  );
};

export default MainHeader;
