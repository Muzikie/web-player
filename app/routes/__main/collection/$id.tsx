/* External dependencies */
import React from 'react';
import { json } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import invariant from 'tiny-invariant';

/* Internal dependencies */
import {
  getProfile,
  getCollection,
  getCollectionAudios,
} from '~/models/entity.server';
import { collectionLoaderProps, CollectionLoaderData } from '../../types';
import List from '~/components/List';
import CollectionSummary from '~/components/Summary/CollectionSummary';
import { liskThemes } from '~/components/List/types';
import styles from '~/css/routes/__main/collection.css';
import { entityThemes } from '~/components/Entity/types';
import { redirect } from '@remix-run/node';
import { getSession } from '~/hooks/useSession';

export function links() {
  return [{ rel: 'stylesheet', href: styles }];
}

export const loader = async ({ params, request }: collectionLoaderProps) => {
  const session = await getSession(
    request.headers.get('Cookie')
  );
  const agreement = session.get('agreement');
  const address = session.get('address');
  if (!agreement && address) {
    // redirect users to agreement page when the agreement cookie is not set
    return redirect('/agreement')
  }
  invariant(params.id, 'Expected params.id');

  const collection = await getCollection(params.id);
  const audios = await getCollectionAudios(params.id);
  const profile = await getProfile(collection.creatorAddress);

  return json<CollectionLoaderData>({
    collection,
    profile,
    audios,
    id: params.id,
  });
};

const CollectionScreen = () => {
  const {
    collection,
    profile,
    audios,
  } = useLoaderData() as CollectionLoaderData;

  return (
    <section className="screen collection">
      <CollectionSummary
        collection={collection}
        profile={profile}
      />
      <List
        items={!audios?.length ? [] : audios}
        className="audioList"
        theme={liskThemes.wide}
        itemTheme={entityThemes.CollectionPage}
      />
    </section>
  );
};

export default CollectionScreen;
