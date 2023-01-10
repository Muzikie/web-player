import React, { useState, useContext } from 'react';

import { IconLink } from '~/components/common/Link';
import { IconButton } from '~/components/common/Button';
import { ProfileContext } from '~/context/profileContext/profileContextProvider';

const MainMenu = () => {
  const [isActive, setIsActive] = useState(false);
  const { info } = useContext(ProfileContext);

  const onClick = () => {
    setIsActive(!isActive);
  };

  return (
    <aside className="component mainMenu">
      <IconButton
        className="menuButton"
        icon={isActive ? 'cross' : 'menu'}
        onClick={onClick}
      />
      <section className={`container ${isActive ? 'active' : ''}`}>
        <div className="list">
          <IconLink
            title="Home"
            icon="home"
            to="/"
            className="menuItem"
            onClick={onClick}
          />
          <IconLink
            title="Search"
            icon="search"
            to="/search"
            className="menuItem"
            onClick={onClick}
          />

          {!!info.address && (
            <>
              {' '}
              <IconLink
                title="Profile"
                icon="user"
                to="/profile/discography"
                className="menuItem"
                onClick={onClick}
              />
              <IconLink
                title="Subscription"
                icon="file"
                to="/subscription/active"
                className="menuItem"
                onClick={onClick}
              />
            </>
          )}

          <IconLink
            title={info.address ? 'Logout' : 'Login'}
            icon="key"
            to={`/login?action=${info.address ? 'logout' : 'login'}`}
            className="menuItem"
            onClick={onClick}
          />
        </div>
      </section>
    </aside>
  );
};

export default MainMenu;
