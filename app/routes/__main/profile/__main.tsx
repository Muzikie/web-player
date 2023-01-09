/* External dependencies */
import React, { useContext, useEffect } from 'react';
import { Outlet } from '@remix-run/react';
import { json } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';

/* Internal dependencies */
import styles from '~/css/routes/__main/profile.css';
import { ProfileContext } from '~/context/profileContext/profileContextProvider';
import { Tabs } from '~/components/common/Tabs';
import { ProfileLoaderProps, ProfileLoaderData } from '../../types';


export const loader = async ({ request }: ProfileLoaderProps) => {};

export function links() {
  return [{ rel: 'stylesheet', href: styles }];
}

const Main = () => {
  const {} = useLoaderData() as ProfileLoaderData;

  return (
    <section className="screen profile">
      <header className='tabsHeader'>
        <Tabs
          items={[
            { title: 'Discography', to: '/profile/discography' },
            { title: 'Add a audio', to: '/profile/createAudio' },
            { title: 'Add an album', to: '/profile/createAlbum' },
          ]}
        />
      </header>
      <Outlet />
    </section>
  );
};

export default Main;
