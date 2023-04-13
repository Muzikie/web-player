import React from 'react';

import CreateAudio from '~/components/CreateAudio';
import { json } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import { getCollections } from '~/models/entity.server';
import { getSession } from '~/hooks/useSession';
import { CollectionInfoLoaderData, collectionLoaderProps } from '../../../../types';

export const loader = async ({ request }: collectionLoaderProps) => {
  const session = await getSession(
    request.headers.get('Cookie')
  );
  const address = session.get('address');
  const collections = await getCollections();
  const CollectionInfo = collections.filter((items) => items.creatorAddress === address)

  return json<CollectionInfoLoaderData>({
    CollectionInfo,
  })
};

const UploadAudioScreen = () => {
  const { CollectionInfo } = useLoaderData() as CollectionInfoLoaderData;
  return (
    <section className="screen create tabContainer">
      <CreateAudio CollectionInfo={CollectionInfo} />
    </section>
  );
}

export default UploadAudioScreen;
