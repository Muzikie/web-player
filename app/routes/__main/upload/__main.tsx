/* External dependencies */
import React from 'react';
import { Outlet } from '@remix-run/react';
import { json } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
/* Internal dependencies */
import styles from '~/css/routes/__main/upload.css';
import { ROUTES } from '~/routes/routes';
import { Tabs } from '~/components/common/Tabs';
import ViewWallet from '~/components/ViewWallet';
import { UploadLoaderProps, UploadLoaderData } from '../../types';
import { getSession } from '~/hooks/useSession';

export function links() {
  return [{ rel: 'stylesheet', href: styles }];
}

export const loader = async ({ request }: UploadLoaderProps) => {
  const session = await getSession(
    request.headers.get('Cookie')
  );

  return json<UploadLoaderData>({
    id: session.get('address')
  });
};

const UploadScreen = () => {
  const { id } = useLoaderData() as UploadLoaderData;

  return (
    <section className="screen upload">
      <ViewWallet address={id} />
      <div className='tab'>
        <header className='tabsHeader'>
          <Tabs
            items={[
              { title: 'Add an audio', to: ROUTES.UPLOAD_AUDIO.location },
              { title: 'Add a collection', to: ROUTES.UPLOAD_COLLECTION.location },
            ]}
          />
        </header>
        <Outlet />
      </div>
    </section>
  );
};

export default UploadScreen;
