/* External dependencies */
import React, { useContext, useEffect } from 'react';
import { json } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';

/* Internal dependencies */
import {
  getPlaylists,
  getRecentlyPlayed,
  getArtists,
  getAlbums,
} from '~/models/entity.server';
import { HomeLoaderProps, HomeLoaderData } from '../../types';
import { ProfileContext } from '~/context/profileContext/profileContextProvider';
import { getSession } from '~/hooks/useSession';
import Collection from '~/components/Collection';
import { entityThemes } from '~/components/Entity/types';
import { collectionThemes } from '~/components/Collection/types';
import styles from '~/css/routes/__main/index.css';

export function links() {
  return [{ rel: 'stylesheet', href: styles }];
}

export const loader = async ({ request }: HomeLoaderProps) => {
  return json<HomeLoaderData>({
    profileInfo,
    playlists: await getPlaylists(),
    recentlyPlayed: await getRecentlyPlayed(),
    artists: await getArtists(),
    albums: await getAlbums(),
  });
};

const Home = () => {
  const { setProfileInfo } = useContext(ProfileContext);
  const {
    playlists,
    recentlyPlayed,
    artists,
    albums,
    profileInfo,
  } = useLoaderData() as HomeLoaderData;

  useEffect(() => {
    if (profileInfo.address) {
      setProfileInfo(profileInfo);
    }
  }, [profileInfo]);

  return (
    <section className="screen home">
      <Collection
        className="playlists"
        title="Playlists"
        itemTheme={entityThemes.large}
        theme={collectionThemes.normal}
        items={!playlists?.length ? [] : playlists}
      />
      <Collection
        className="recent"
        title="Recent"
        itemTheme={entityThemes.minimal}
        items={!recentlyPlayed?.length ? [] : recentlyPlayed}
      />
      <Collection
        className="favorite"
        title="Favorite"
        itemTheme={entityThemes.minimal}
        items={!artists.length ? [] : artists}
      />
      <Collection
        className="favorite"
        title="Favorite"
        itemTheme={entityThemes.minimal}
        items={!albums.length ? [] : albums}
      />
    </section>
  );
};

export default Home;
