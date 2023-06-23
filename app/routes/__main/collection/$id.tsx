/* External dependencies */
import React from 'react';
import { json } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import invariant from 'tiny-invariant';
/* Internal dependencies */
import {
  // getProfile,
  getCollections,
  getAudios,
} from '~/models/entity.server';
import { collectionLoaderProps, CollectionLoaderData } from '../../types';
import List from '~/components/List';
import CollectionSummary from '~/components/Summary/CollectionSummary';
import { liskThemes } from '~/components/List/types';
import styles from '~/css/routes/__main/collection.css';
import { entityThemes } from '~/components/Entity/types';
import { Audio } from '~/configs';

export function links() {
  return [{ rel: 'stylesheet', href: styles }];
}

export const loader = async ({ params }: collectionLoaderProps) => {
  invariant(params.id, 'Expected params.id');

  const { data:  collections } = await getCollections({ params: { collectionID: params.id } });

  let audios: Audio[] = [];
  if (collections.length) {
    const audiosResult = await getAudios({ params: { collectionID: params.id } });
    audios = audiosResult.data;
  } else {
    throw new Error('Collection not found');
  }

  // @todo reinstate the profile endpoint data once this endpoint is available
  // const profile = await getProfile(collection.creatorAddress);
  return json<CollectionLoaderData>({
    collection: collections[0],
    profile: {
      creatorAddress: collections[0].creatorAddress,
      name: '',
      nickName: '',
      description: '',
      avatarHash: '',
      avatarSignature: '',
      bannerHash: '',
      bannerSignature: '',
      socialAccounts: [],
      profileID: '',
    },
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
