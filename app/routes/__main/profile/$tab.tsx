/* External dependencies */
import React, { useContext, useEffect, useMemo } from 'react';
import { json } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import invariant from 'tiny-invariant';

/* Internal dependencies */
import EntityRow from '~/components/Entity/EntityRow';
import styles from '~/styles/routes/__main/profile.css';
import { ProfileContext } from '~/context/profileContext/profileContextProvider';
import { Tabs } from '~/components/common/Tabs';
import { ProfileLoaderProps, ProfileLoaderData } from '../../types';
import { getSession } from '~/hooks/useSession';
import { getUserAlbums, getUserTracks } from '~/models/entity.server';
import { entityMode, TrackType } from '~/components/Entity/types';

export const loader = async ({ params, request }: ProfileLoaderProps) => {
  invariant(params.tab, 'Expected params.tab');

  const session = await getSession(
    request.headers.get('Cookie')
  ); 
  const profileInfo = {
    address: `${session.get('address') ?? ''}`,
    publicKey: `${session.get('publicKey') ?? ''}`,
    privateKey: `${session.get('privateKey') ?? ''}`,
  };

  return json<ProfileLoaderData>({
    profileInfo,
    albums: await getUserAlbums(profileInfo.address),
    tracks: await getUserTracks(profileInfo.address),
  });
};

export function links() {
  return [{ rel: 'stylesheet', href: styles }];
}

const Profile = () => {
  const { setProfileInfo } = useContext(ProfileContext);
  const {
    tracks,
    albums,
    profileInfo,
  } = useLoaderData() as ProfileLoaderData;

  const discography = useMemo(() => {
    return tracks.reduce((acc: {[key: string]: TrackType[]}, item: TrackType) => {
      if (!acc[item.albumId]) {
        acc[item.albumId] = [];
      }

      acc[item.albumId].push(item);
      return acc;
    }, {});
  }, [albums]);

  console.log(discography);

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
            { title: 'Upload', to: '/profile/upload' },
          ]}
        />
      </header>
      <section className="discographyTab tabContainer">
        <div className="container">
          {
            albums.map((album, index) => (
              <>
                <EntityRow
                  key={`album-${album.id}-${index}`}
                  data={albums[0]}
                  mode={entityMode.edit}
                />
                <section className='albumTracks'>
                  {
                    discography[album.id].map((track, index) => (
                      <EntityRow
                        key={`track-${track.id}-${index}`}
                        data={track}
                        mode={entityMode.edit}
                      />
                    ))
                  }
                </section>
              </>
            ))
          }
        </div>
      </section>
      <section className="uploadTab tabContainer">
        <form>
          <input type="file" />
          <button>Submit</button>
        </form>
      </section>
    </section>
  );
};

export default Profile;
