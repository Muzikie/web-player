/* External dependencies */
import React from 'react';
import { Outlet } from '@remix-run/react';

/* Internal dependencies */
import PlayerProvider from '~/context/playerContextProvider';
import ProfileProvider from '~/context/profileContextProvider';
import SettingsProvider from '~/context/settingsContextProvider';
import MainMenu from '~/components/MainMenu';
import Player from '~/components/Player';
import styles from '~/styles/routes/__main.css';

export function links() {
  return [{ rel: 'stylesheet', href: styles }];
}

const Main = () => (
  <SettingsProvider>
    <ProfileProvider>
      <PlayerProvider>
        <div id="layout" className="component layout">
          <MainMenu />
          <main className="main">
            <Outlet />
          </main>
          <Player />
        </div>
      </PlayerProvider>
    </ProfileProvider>
  </SettingsProvider>
);

export default Main;
