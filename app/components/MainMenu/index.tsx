import React, { useState, useContext } from 'react';

import { IconLink } from '~/components/common/Link';
import { IconButton } from '~/components/common/Button';
import { ProfileContext } from '~/context/profileContextProvider';

const MainMenu = () => {
  const [isActive, setIsActive] = useState(false);
  const onClick = () => setIsActive(!isActive);
  const { info } = useContext(ProfileContext);

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
            className="menuItem active"
            onClick={onClick}
          />
          <IconLink
            title="Search"
            icon="search"
            to="/search"
            className="menuItem"
            onClick={onClick}
          />
          <IconLink
            title="Profile"
            icon="user"
            to="/profile"
            className="menuItem"
            onClick={onClick}
          />
          <IconLink
            title={ info.address ? 'Logout' : 'Login' }
            icon="key"
            to="/login"
            className="menuItem"
            onClick={onClick}
          />
        </div>
      </section>
    </aside>
  );
};

export default MainMenu;
