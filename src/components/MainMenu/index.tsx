import React, { useState } from 'react';
import { IconLink } from '../common/Link';
import { IconButton } from '../common/Button';

import styles from './mainMenu.css';

const MainMenu = () => {
  const [isActive, setIsActive] = useState(false);

  const onClick = () => setIsActive(!isActive);

  return (
    <aside className={styles.wrapper}>
      <IconButton
        className={styles.menuButton}
        icon={isActive ? 'cross' : 'menu'}
        onClick={onClick}
      />
      <section className={`${styles.container} ${isActive ? styles.active : ''}`}>
        <div className={styles.list}>
          <IconLink
            title="Home"
            icon="home"
            href="/"
            className={`${styles.menuItem} ${styles.active}`}
            onClick={onClick}
          />
          <IconLink
            title="Search"
            icon="search"
            href="/search"
            className={styles.menuItem}
            onClick={onClick}
          />
          <IconLink
            title="Profile"
            icon="user"
            href="/profile"
            className={styles.menuItem}
            onClick={onClick}
          />
          {/* <IconLink
            title="settings"
            icon="settings"
            href="/settings"
            className={styles.menuItem}
            onClick={onClick}
          /> */}
        </div>
      </section>
    </aside>
  );
};

export default MainMenu;
