/* External dependencies */
import React, { useContext } from 'react';
import { json } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';

/* Internal dependencies */
import styles from '~/styles/routes/__main/profile.css';
import { ProfileContext } from '~/context/profileContext/profileContextProvider';
import { Tabs } from '~/components/common/Tabs';
import { getUserAlbums, getUserTracks } from '~/models/entity.server';

type LoaderData = {
  albums: Awaited<ReturnType<typeof getUserAlbums>>;
  tracks: Awaited<ReturnType<typeof getUserTracks>>;
};

export const loader = async (params) => {
  console.log('params', params);
  const session = params.request.headers.get('Cookie');
  console.log('session', session);

  const albums = await getUserAlbums('some');
  const tracks = await getUserTracks('some');
  
  return json<LoaderData>({
    albums,
    tracks,
  });
};

export function links() {
  return [{ rel: 'stylesheet', href: styles }];
}

const Profile = () => {
 const res = useLoaderData() as LoaderData;

  return (
    <section className="screen profile">
      <header className='tabsHeader'>
        <Tabs
          items={[
            { title: 'Discography', to: '/discography' },
            // { title: 'Playlists (Soon)', to: '/playlists', inactive: true },
            { title: 'Upload', to: '/upload' },
          ]}
        />
      </header>
      <section className="discographyTab">
        <div className="container">
          {

          }
        </div>
      </section>
      <section className="uploadTab">
        <form>
          <input type="file" />
          <button>Submit</button>
        </form>
      </section>
    </section>
  );
};

export default Profile;
