import React, { useState, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';

/* Internal dependencies */
import { Link } from '~/components/common/Link';
import { IconButton } from '~/components/common/Button';
import { ROUTES } from '~/routes/routes';
import { useAccount } from '~/hooks/useAccount/useAccount';

const MainMenu = () => {
  const menuRef = useRef<HTMLElement>(null);
  const [isActive, setIsActive] = useState(false);
  const { isLoggedIn } = useAccount();
  const location = useLocation();

  const onClick = () => {
    setIsActive(!isActive);
  };

  useEffect(() => {
    setIsActive(false);
  }, [location.pathname]);

  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setIsActive(false);
      }
    };

    document.addEventListener('click', handleOutsideClick);

    return () => {
      document.removeEventListener('click', handleOutsideClick);
    };
  }, []);

  return (
    <aside className="component mainMenu" ref={menuRef}>
      <IconButton
        className="menuButton"
        icon={isActive ? 'cross' : 'menuCut'}
        onClick={onClick}
      />
      <section className={`menuContainer ${isActive ? 'active' : ''}`}>
        <div className="list">
          {
            location.pathname !== ROUTES.AGREEMENT.location && (
              <>
                <Link
                  icon="home"
                  to={ROUTES.HOME.location}
                  className="menuItem"
                >
                  Home
                </Link>
                <Link
                  icon="search"
                  to={ROUTES.SEARCH.location}
                  className="menuItem"
                >
                  Search
                </Link>
              </>
            )
          }
          {
            location.pathname !== ROUTES.AGREEMENT.location && !!isLoggedIn && (
              <>
                <Link
                  icon="user"
                  to={ROUTES.DASHBOARD.location}
                  className="menuItem"
                >
                  Dashboard
                </Link>
                <Link
                  icon="file"
                  to={ROUTES.SUBSCRIPTION_ACTIVE.location}
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
                  to={ROUTES.LOGOUT.location}
                  className="menuItem"
                >
                  Logout
                </Link>
              )
              : (
                <Link
                  icon="key"
                  to={ROUTES.LOGIN.location}
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
