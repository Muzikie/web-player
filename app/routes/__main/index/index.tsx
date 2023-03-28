/* External dependencies */
import React from 'react';
import { json, redirect } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';

/* Internal dependencies */
import {
  getRecentlyPlayed,
  getProfiles,
  getCollections,
} from '~/models/entity.server';
import { HomeLoaderData, LoaderBaseProps } from '../../types';
import List from '~/components/List';
import { entityThemes } from '~/components/Entity/types';
import styles from '~/css/routes/__main/index.css';
import { getSession } from '~/hooks/useSession';

export function links() {
  return [{ rel: 'stylesheet', href: styles }];
}

export const loader = async ({ request }: LoaderBaseProps) => {

  const session = await getSession(
    request.headers.get('Cookie')
  );
  const agreement = session.get('agreement');
  const address = session.get('address');
  if (!agreement && address) {
    // redirect users to agreement page when the agreement cookie is not set
    return redirect('/agreement')
  }

  return json<HomeLoaderData>({
    recentlyPlayed: await getRecentlyPlayed(),
    profiles: await getProfiles(),
    collections: await getCollections(),
  });

};

const HomeScreen = () => {
  const {
    recentlyPlayed,
    // profiles,
    collections,
  } = useLoaderData() as HomeLoaderData;

  return (
    <section className="screen home">
      <List
        className="recent"
        title="Recent"
        itemTheme={entityThemes.HomePage}
        items={!recentlyPlayed?.length ? [] : recentlyPlayed}
      />
      {/* <List
        className="favorite"
        title="Favorite"
        items={!profiles?.length ? [] : profiles}
      /> */}
      <List
        className="favorite"
        title="Favorite"
        itemTheme={entityThemes.CollectionPage}
        items={!collections?.length ? [] : collections}
      />
    </section>
  );
};

export default HomeScreen;
