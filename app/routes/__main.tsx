/* External dependencies */
import React from 'react';
import { Outlet } from '@remix-run/react';

/* Internal dependencies */
import PlayerProvider from '~/context/playerContext/playerContextProvider';
import ProfileProvider from '~/context/profileContext/profileContextProvider';
import SettingsProvider from '~/context/settingsContext/settingsContextProvider';
import MainHeader from '~/components/MainHeader';
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
          <MainHeader />
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
