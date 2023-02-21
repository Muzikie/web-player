import React, { useState, useContext, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/* Internal dependencies */
import { Link } from '~/components/common/Link';
import { IconButton } from '~/components/common/Button';
import { ProfileContext } from '~/context/profileContext/profileContextProvider';
import { ROUTES } from '~/routes/routes';


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
            to={ROUTES.HOME}
            className="menuItem"
          >
            Home
          </Link>
          <Link
            icon="search"
            to={ROUTES.SEARCH}
            className="menuItem"
          >
            Search
          </Link>

          {!!info.address && (
            <>
              {' '}
              <Link
                icon="user"
                to={ROUTES.MY_PROFILE}
                className="menuItem"
              >
                Profile
              </Link>
              <Link
                icon="user"
                to={ROUTES.UPLOAD_COLLECTION}
                className="menuItem"
              >
                Upload
              </Link>
              <Link
                icon="file"
                to={ROUTES.SUBSCRIPTION_ACTIVE}
                className="menuItem"
              >
                Subscription
              </Link>
            </>
          )}

          <Link
            icon="key"
            to={`${ROUTES.LOGIN}?action=${info.address ? 'logout' : 'login'}`}
            className="menuItem"
          >{info.address ? 'Logout' : 'Login'}</Link>
        </div>
      </section>
    </aside>
  );
};

export default MainMenu;
