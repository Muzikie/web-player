/* External dependencies */
import React from 'react';
import { json } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import invariant from 'tiny-invariant';

/* Internal dependencies */
import {
  getCollection,
  getCollectionAudios,
} from '~/models/entity.server';
import { collectionLoaderProps, CollectionLoaderData } from '../../types';
import List from '~/components/List';
import CollectionSummary from '~/components/Summary/CollectionSummary';
import { liskThemes } from '~/components/List/types';
import styles from '~/css/routes/__main/collection.css';

export function links() {
  return [{ rel: 'stylesheet', href: styles }];
}

export const loader = async ({ params }: collectionLoaderProps) => {
  invariant(params.id, 'Expected params.id');

  return json<CollectionLoaderData>({
    collection: await getCollection(params.id),
    audios: await getCollectionAudios(params.id),
    id: params.id,
  });
};

const CollectionScreen = () => {
  const {
    collection,
    audios,
  } = useLoaderData() as CollectionLoaderData;

  return (
    <section className="screen collection">
      {
        collection && <CollectionSummary data={collection} />
      }
      <List
        items={!audios?.length ? [] : audios}
        className="audioList"
        theme={liskThemes.wide}
      />
    </section>
  );
};

export default CollectionScreen;
