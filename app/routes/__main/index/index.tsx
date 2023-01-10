/* External dependencies */
import React from 'react';
import { json } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';

/* Internal dependencies */
import {
  // getPlaylists,
  getRecentlyPlayed,
  getArtists,
  getAlbums,
} from '~/models/entity.server';
import { HomeLoaderData } from '../../types';
import Collection from '~/components/Collection';
import { entityThemes } from '~/components/Entity/types';
// import { collectionThemes } from '~/components/Collection/types';
import styles from '~/css/routes/__main/index.css';

export function links() {
  return [{ rel: 'stylesheet', href: styles }];
}

export const loader = async () => {
  // @todo replace this with the list of all albums on the node
  return json<HomeLoaderData>({
    playlists: [],
    recentlyPlayed: await getRecentlyPlayed(),
    artists: await getArtists(),
    albums: await getAlbums(),
  });
};

const Home = () => {
  const {
    recentlyPlayed,
    artists,
    albums,
  } = useLoaderData() as HomeLoaderData;

  return (
    <section className="screen home">
      {/* <Collection
        className="playlists"
        title="Playlists"
        itemTheme={entityThemes.large}
        theme={collectionThemes.normal}
        items={!playlists?.length ? [] : playlists}
      /> */}
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
