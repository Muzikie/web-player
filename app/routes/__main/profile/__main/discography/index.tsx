/* External dependencies */
import React from 'react';
import { json } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';

/* Internal dependencies */
import { DiscographyLoaderData, ProfileLoaderProps } from '../../../../types';
import { getUserAlbums, getUserTracks } from '~/models/entity.server';
import UserDiscography from '~/components/UserDiscography';

export const loader = async ({ request }: ProfileLoaderProps) => {
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
