/* External dependencies */
import React from 'react';
import { Outlet } from '@remix-run/react';

/* Internal dependencies */
import styles from '~/css/routes/__main/upload.css';
import { ROUTES } from '~/routes/routes';
import { Tabs } from '~/components/common/Tabs';

export function links() {
  return [{ rel: 'stylesheet', href: styles }];
}

const UploadScreen = () => (
  <section className="screen upload">
    <header className='tabsHeader'>
      <Tabs
        items={[
          { title: 'Add an audio', to: ROUTES.UPLOAD_AUDIO },
          { title: 'Add a collection', to: ROUTES.UPLOAD_COLLECTION },
        ]}
      />
    </header>
    <Outlet />
  </section>
);

export default UploadScreen;
