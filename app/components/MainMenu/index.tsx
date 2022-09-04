import { useState } from 'react';
import { IconLink } from '~/components/common/Link';
import { IconButton } from '~/components/common/Button';

const MainMenu = () => {
  const [isActive, setIsActive] = useState(false);
  const onClick = () => setIsActive(!isActive);

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
          {/* <IconLink
            title="settings"
            icon="settings"
            to="/settings"
            className={styles.menuItem}
            onClick={onClick}
          /> */}
        </div>
      </section>
    </aside>
  );
};

export default MainMenu;
