/* External dependencies */
import React from 'react';
import { json } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
// /* Internal dependencies */
import {
  // getProfiles,
  getAudios,
  getCollections,
} from '~/models/entity.server';
import { HomeLoaderData } from '../../types';
import List from '~/components/List';
import { entityThemes } from '~/components/Entity/types';
import styles from '~/css/routes/__main/index.css';

export function links() {
  return [{ rel: 'stylesheet', href: styles }];
}

export const loader = async () => {
  const { data: collections } = await getCollections({ params: {} });
  const { data: trending } = await getAudios({ params: {} });
  // const { data: profiles } = await getProfiles({ params: {} });

  return json<HomeLoaderData>({
    profiles: [],
    trending,
    collections,
  });
};

const HomeScreen = () => {
  const {
    trending,
    profiles,
    collections,
  } = useLoaderData() as HomeLoaderData;

  return (
    <section className="screen home">
      {
        trending.length && (
          <List
            className="recent"
            title="Recent"
            itemTheme={entityThemes.HomePage}
            items={trending}
          />
        )
      }
      {
        profiles.length && (
          <List
            className="favorite"
            title="Favorite"
            items={profiles}
          />
        )
      }
      {
        collections.length && (
          <List
            className="favorite"
            title="Favorite"
            itemTheme={entityThemes.CollectionPage}
            items={collections}
          />
        )
      }
    </section>
  );
};

export default HomeScreen;
