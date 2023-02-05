/* External dependencies */
import React from 'react';
import { json } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import invariant from 'tiny-invariant';

/* Internal dependencies */
import {
  getArtist,
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

  const collection = await getCollection(params.id);
  const audios = await getCollectionAudios(params.id);
  const artist = await getArtist(collection.creatorAddress);

  return json<CollectionLoaderData>({
    collection,
    artist,
    audios,
    id: params.id,
  });
};

const CollectionScreen = () => {
  const {
    collection,
    artist,
    audios,
  } = useLoaderData() as CollectionLoaderData;

  return (
    <section className="screen collection">
      <CollectionSummary
        collection={collection}
        artist={artist}
      />
      <List
        items={!audios?.length ? [] : audios}
        className="audioList"
        theme={liskThemes.wide}
      />
    </section>
  );
};

export default CollectionScreen;
