/* External dependencies */
import React from 'react';
import {Outlet} from '@remix-run/react';

/* Internal dependencies */
import styles from '~/css/routes/__main/subscription.css';
import {Tabs} from '~/components/common/Tabs';

export function links() {
  return [{rel: 'stylesheet', href: styles}];
}

const Main = () => {
  return (
    <section className="screen subscription">
      <header className="tabsHeader">
        <Tabs
          items={[
            {title: 'Active', to: '/subscription/active'},
            {title: 'Purchase', to: '/subscription/purchase'}
          ]}
        />
      </header>
      <Outlet />
    </section>
  );
};

export default Main;
