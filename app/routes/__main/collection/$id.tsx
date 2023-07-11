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
  getProfiles,
} from '~/models/entity.server';
import { collectionLoaderProps, CollectionLoaderData } from '../../types';
import List from '~/components/List';
import CollectionSummary from '~/components/Summary/CollectionSummary';
import { liskThemes } from '~/components/List/types';
import styles from '~/css/routes/__main/collection.css';
import { entityThemes } from '~/components/Entity/types';
import { Audio, Profile } from '~/configs';

export function links() {
  return [{ rel: 'stylesheet', href: styles }];
}

export const loader = async ({ params }: collectionLoaderProps) => {
  invariant(params.id, 'Expected params.id');
  let audios: Audio[] = [];
  let profile: Profile = {
    creatorAddress: '',
    name: '',
    nickName: '',
    description: '',
    avatarHash: '',
    avatarSignature: '',
    bannerHash: '',
    bannerSignature: '',
    socialAccounts: [],
    profileID: '',
  };

  const { data: collections } = await getCollections({ params: { collectionID: params.id } });
  if (collections.length) {
    const { creatorAddress, collectionID } = collections[0];
    const audiosResult = await getAudios({ params: { collectionID } });
    const profilesResult = await getProfiles({ params: { creatorAddress } });
    audios = audiosResult.data;
    profile = profilesResult.data.length ? profilesResult.data[0] : { ...profilesResult.data[0], creatorAddress };
  } else {
    throw new Error('Collection not found');
  }

  return json<CollectionLoaderData>({
    collection: collections[0],
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
