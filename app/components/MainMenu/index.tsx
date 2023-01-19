import React, { useState, useContext } from 'react';
import { useLocation } from 'react-router-dom';

/* Internal dependencies */
import { Link } from '~/components/common/Link';
import { IconButton } from '~/components/common/Button';
import { ProfileContext } from '~/context/profileContext/profileContextProvider';
import { useEffect } from 'react';

const MainMenu = () => {
  const [isActive, setIsActive] = useState(false);
  const { info } = useContext(ProfileContext);
  const location = useLocation();

  const onClick = () => {
    setIsActive(!isActive);
  };

  useEffect(() => {
    setIsActive(false);
  }, [location.pathname]);

  return (
    <aside className="component mainMenu">
      <IconButton
        className="menuButton"
        icon={isActive ? 'cross' : 'menuCut'}
        onClick={onClick}
      />
      <section className={`menuContainer ${isActive ? 'active' : ''}`}>
        <div className="list">
          <Link
            icon="home"
            to="/"
            className="menuItem"
          >
            Home
          </Link>
          <Link
            icon="search"
            to="/search"
            className="menuItem"
          >
            Search
          </Link>

          {!!info.address && (
            <>
              {' '}
              <Link
                icon="user"
                to="/profile/discography"
                className="menuItem"
              >
                Profile
              </Link>
              <Link
                icon="file"
                to="/subscription/active"
                className="menuItem"
              >
                Subscription
              </Link>
            </>
          )}

          <Link
            icon="key"
            to={`/login?action=${info.address ? 'logout' : 'login'}`}
            className="menuItem"
          >{info.address ? 'Logout' : 'Login'}</Link>
        </div>
      </section>
    </aside>
  );
};

export default MainMenu;
