/* External dependencies */
import React from 'react';
import { json } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import { getSession } from '~/hooks/useSession';

/* Internal dependencies */
import { DiscographyLoaderData, LoaderBaseProps } from '~/routes/types';
import { getUserAlbums, getUserTracks } from '~/models/entity.server';
import UserDiscography from '~/components/UserDiscography';

export const loader = async ({ request }: LoaderBaseProps) => {
  const session = await getSession(
    request.headers.get('Cookie')
  );

  const address = session.get('address');
  return json<DiscographyLoaderData>({
    albums: await getUserAlbums(address),
    tracks: await getUserTracks(address),
  });
};

const Discography = () => {
  const {
    tracks,
    albums,
  } = useLoaderData() as DiscographyLoaderData;

  return (<UserDiscography tracks={tracks} albums={albums} />);
};

export default Discography;
