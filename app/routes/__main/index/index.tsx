/* External dependencies */
import React from 'react';
import { json } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';

/* Internal dependencies */
import {
  getRecentlyPlayed,
  getArtists,
  getAlbums,
} from '~/models/entity.server';
import { HomeLoaderData } from '../../types';
import Collection from '~/components/Collection';
import { entityThemes } from '~/components/Entity/types';
import styles from '~/css/routes/__main/index.css';

export function links() {
  return [{ rel: 'stylesheet', href: styles }];
}

export const loader = async () => {
  return json<HomeLoaderData>({
    recentlyPlayed: await getRecentlyPlayed(),
    artists: await getArtists(),
    albums: await getAlbums(),
  });
};

const Home = () => {
  const {
    recentlyPlayed,
    // artists,
    albums,
  } = useLoaderData() as HomeLoaderData;

  return (
    <section className="screen home">
      <Collection
        className="recent"
        title="Recent"
        itemTheme={entityThemes.minimal}
        items={!recentlyPlayed?.length ? [] : recentlyPlayed}
      />
      {/* <Collection
        className="favorite"
        title="Favorite"
        itemTheme={entityThemes.minimal}
        items={!artists?.length ? [] : artists}
      /> */}
      <Collection
        className="favorite"
        title="Favorite"
        itemTheme={entityThemes.minimal}
        items={!albums?.length ? [] : albums}
      />
    </section>
  );
};

export default Home;
