import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/* Internal dependencies */
import { Link } from '~/components/common/Link';
import { IconButton } from '~/components/common/Button';
import { ROUTES } from '~/routes/routes';
import { useAccount } from '~/hooks/useAccount/useAccount';

const MainMenu = () => {
  const [isActive, setIsActive] = useState(false);
  const { isLoggedIn } = useAccount();
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
          {
            location.pathname !== '/agreement' && (
              <>
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
              </>
            )
          }
          {
            location.pathname !== '/agreement' && !!isLoggedIn && (
              <>
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
            )
          }
          {
            isLoggedIn
              ? (
                <Link
                  icon="key"
                  to={ROUTES.LOGOUT}
                  className="menuItem"
                >
                  Logout
                </Link>
              )
              : (
                <Link
                  icon="key"
                  to={ROUTES.LOGIN}
                  className="menuItem"
                >
                  Login
                </Link>
              )
          }
        </div>
      </section>
    </aside>
  );
};

export default MainMenu;
