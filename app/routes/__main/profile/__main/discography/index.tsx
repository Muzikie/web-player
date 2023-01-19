/* External dependencies */
import React from 'react';
import { json } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import { getSession } from '~/hooks/useSession';

/* Internal dependencies */
import { DiscographyLoaderData, LoaderBaseProps } from '~/routes/types';
import { getUserCollections, getUserAudios } from '~/models/entity.server';
import UserDiscography from '~/components/UserDiscography';

export const loader = async ({ request }: LoaderBaseProps) => {
  const session = await getSession(
    request.headers.get('Cookie')
  );

  const address = session.get('address');
  return json<DiscographyLoaderData>({
    collections: await getUserCollections(address),
    audios: await getUserAudios(address),
  });
};

const Discography = () => {
  const {
    audios,
    collections,
  } = useLoaderData() as DiscographyLoaderData;

  return (<UserDiscography audios={audios} collections={collections} />);
};

export default Discography;
