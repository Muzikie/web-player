/* External dependencies */
import React, { useContext, useEffect } from 'react';
import { Outlet } from '@remix-run/react';
import { json } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';

/* Internal dependencies */
import styles from '~/styles/routes/__main/profile.css';
import { ProfileContext } from '~/context/profileContext/profileContextProvider';
import { Tabs } from '~/components/common/Tabs';
import { ProfileLoaderProps, ProfileLoaderData } from '../../types';
import { getSession } from '~/hooks/useSession';


export const loader = async ({ request }: ProfileLoaderProps) => {
  const session = await getSession(
    request.headers.get('Cookie')
  ); 
  const profileInfo = {
    address: `${session.get('address') ?? ''}`,
    publicKey: `${Buffer.from(session.get('publicKey')).toString('hex') ?? ''}`,
    privateKey: `${Buffer.from(session.get('privateKey')).toString('hex') ?? ''}`,
  };

  return json<ProfileLoaderData>({
    profileInfo,
  });
};

export function links() {
  return [{ rel: 'stylesheet', href: styles }];
}

const Main = () => {
  const { setProfileInfo } = useContext(ProfileContext);
  const {
    profileInfo,
  } = useLoaderData() as ProfileLoaderData;

  useEffect(() => {
    if (profileInfo.address) {
      setProfileInfo(profileInfo);
    }
  }, [profileInfo]);

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
