import React from 'react';

import CreateAudio from '~/components/CreateAudio';
import { json } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import { getCollections } from '~/models/entity.server';
import { getSession } from '~/hooks/useSession';
import { AudioCollectionLoaderData, collectionLoaderProps } from '../../../../types';

export const loader = async ({ request }: collectionLoaderProps) => {
  const session = await getSession(
    request.headers.get('Cookie')
  );
  const address = session.get('address');
  console.log('address', address)
  const collections = await getCollections();
  const collectionsAudio = collections.filter((items) => items.creatorAddress === address)
  console.log('collectionsAudio.item', collectionsAudio);

  return json<AudioCollectionLoaderData>({
    collectionsAudio,
  })
};

const UploadAudioScreen = () => {
  const { collectionsAudio } = useLoaderData() as AudioCollectionLoaderData;
  console.log('collectionsAudio', collectionsAudio);
  return (
    <section className="screen create tabContainer">
      <CreateAudio collectionsAudio={collectionsAudio} />
    </section>
  );
}

export default UploadAudioScreen;
