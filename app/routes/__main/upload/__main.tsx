/* External dependencies */
import React from 'react';
import { Outlet } from '@remix-run/react';

/* Internal dependencies */
import styles from '~/css/routes/__main/profile.css';
import { Tabs } from '~/components/common/Tabs';

export function links() {
  return [{ rel: 'stylesheet', href: styles }];
}

const ProfileScreen = () => (
  <section className="screen profile">
    <header className='tabsHeader'>
      <Tabs
        items={[
          { title: 'Add an audio', to: '/profile/createAudio' },
          { title: 'Add a collection', to: '/profile/createCollection' },
        ]}
      />
    </header>
    <Outlet />
  </section>
);

export default ProfileScreen;
