/* External dependencies */
import React from 'react';
import { Outlet } from '@remix-run/react';
import { redirect } from '@remix-run/node';
import { getSession } from '~/hooks/useSession';

/* Internal dependencies */
import styles from '~/css/routes/__main/upload.css';
import { ROUTES } from '~/routes/routes';
import { Tabs } from '~/components/common/Tabs';

export function links() {
  return [{ rel: 'stylesheet', href: styles }];
}

export const loader = async ({ request }: any) => {
  const session = await getSession(
    request.headers.get('Cookie')
  );
  const agreement = session.get('agreement');
  const address = session.get('address');
  if (!address) {
    // redirect users to home page when users are logout
    return redirect('/')
  }
  if (!agreement) {
    // redirect users to agreement page when the agreement cookie is not set
    return redirect('/agreement')
  }
  return session;
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
