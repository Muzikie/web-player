/* External dependencies */
import React from 'react';
import { Outlet } from '@remix-run/react';


/* Internal dependencies */
import styles from '~/css/routes/__main/profile.css';
import { Tabs } from '~/components/common/Tabs';


export function links() {
  return [{ rel: 'stylesheet', href: styles }];
}

const Main = () => {

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
