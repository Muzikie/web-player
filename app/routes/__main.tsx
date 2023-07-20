/* External dependencies */
import React from 'react';
import { Outlet } from '@remix-run/react';
import { json, redirect } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';

/* Internal dependencies */
import PlayerProvider from '~/context/playerContext/playerContextProvider';
import AccountProvider from '~/context/accountContext/AccountContextProvider';
import SettingsProvider from '~/context/settingsContext/settingsContextProvider';
import MainHeader from '~/components/MainHeader';
import { getSession, commitSession } from '~/hooks/useSession';
import Player from '~/components/Player';
import styles from '~/css/routes/__main.css';
import { PUBLIC_ROUTES, ROUTES } from './routes';
import { LoaderBaseProps, MainLoaderData } from './types';

export function links() {
  return [{ rel: 'stylesheet', href: styles }];
}

export async function loader({ request }: LoaderBaseProps) {
  const url = new URL(request.url);
  const { pathname } = url;
  const session = await getSession(
    request.headers.get('Cookie')
  );

  const passphrase = session.get('passphrase');

  if (!passphrase && !PUBLIC_ROUTES.includes(pathname)) {
    return redirect(ROUTES.LOGIN);
  }

  const data: MainLoaderData = {
    passphrase,
  };

  return json(data, {
    headers: {
      'Set-Cookie': await commitSession(session),
    },
  });
}

const Main = () => {
  const { passphrase } = useLoaderData() as MainLoaderData;
  return (
    <AccountProvider passphrase={passphrase}>
      <SettingsProvider>
        <PlayerProvider>
          <div id="layout" className="component layout">
            <MainHeader />
            <main className="main">
              <Outlet />
            </main>
            <Player />
          </div>
        </PlayerProvider>
      </SettingsProvider>
    </AccountProvider>
  );
};

export default Main;
