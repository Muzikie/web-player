/* External dependencies */
import React from 'react';
import { json } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';

/* Internal dependencies */
import CreateAudio from '~/components/CreateAudio';
import { getCollections } from '~/models/entity.server';
import { getSession } from '~/hooks/useSession';
import { extractCredentials } from '~/helpers/cryptography';
import { CollectionInfoLoaderData, collectionLoaderProps } from '~/routes/types';

export const loader = async ({ request }: collectionLoaderProps) => {
  const session = await getSession(
    request.headers.get('Cookie')
  );
  const passphrase = session.get('passphrase');
  const { address } = await extractCredentials(passphrase);
  const { data:  CollectionInfo } = await getCollections({ params: { creatorAddress: address } });

  return json<CollectionInfoLoaderData>({
    CollectionInfo,
    address,
  });
};

const UploadAudioScreen = () => {
  const { CollectionInfo, address } = useLoaderData() as CollectionInfoLoaderData;
  return (
    <section className="screen create tabContainer">
      <CreateAudio CollectionInfo={CollectionInfo} creatorAddress={address} />
    </section>
  );
};

export default UploadAudioScreen;
