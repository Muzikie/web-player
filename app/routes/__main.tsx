/* External dependencies */
import React from 'react';
import { Outlet } from '@remix-run/react';
import { json } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';

/* Internal dependencies */
import PlayerProvider from '~/context/playerContext/playerContextProvider';
import ProfileProvider from '~/context/profileContext/profileContextProvider';
import SettingsProvider from '~/context/settingsContext/settingsContextProvider';
import SocketContext from '~/context/socketContext/socketContextProvider';
import MainHeader from '~/components/MainHeader';
import { getSession, commitSession } from '~/hooks/useSession';
import Player from '~/components/Player';
import styles from '~/css/routes/__main.css';
import { LoaderBaseProps } from './types';

export function links() {
  return [{ rel: 'stylesheet', href: styles }];
}

export async function loader({ request }: LoaderBaseProps) {
  const session = await getSession(
    request.headers.get('Cookie')
  );

  const address = session.get('address');
  const publicKey = session.get('publicKey');
  const privateKey = session.get('privateKey');

  const data = {
    address: address ?? '',
    publicKey: publicKey ? Buffer.from(publicKey).toString('hex') : '',
    privateKey: privateKey ? Buffer.from(privateKey).toString('hex') : '',
  };

  return json(data, {
    headers: {
      'Set-Cookie': await commitSession(session),
    },
  });
}

const Main = () => (
  <SocketContext>
    <SettingsProvider>
      <ProfileProvider sessionData={useLoaderData()}>
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
  </SocketContext>
);

export default Main;
