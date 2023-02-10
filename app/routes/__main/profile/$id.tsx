/* External dependencies */
import React from 'react';
import { json } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import invariant from 'tiny-invariant';

/* Internal dependencies */
import {
  getArtist,
  getArtistCollections,
  getArtistAudios,
} from '~/models/entity.server';
import ProfileBanner from '~/components/ProfileBanner';
import ProfileDetails from '~/components/ProfileDetails';
import PopularAudios from '~/components/PopularAudios';
import WalletDetails from '~/components/WalletDetails';
import styles from '~/css/routes/__main/artist.css';
import { artistLoaderProps, ArtistLoaderData } from '../../types';
import Discography from '../upload/__main/discography';

export function links() {
  return [{ rel: 'stylesheet', href: styles }];
}

export const loader = async ({ params }: artistLoaderProps) => {
  invariant(params.id, 'Expected params.id');

  const artist = await getArtist(params.id);
  const collections = await getArtistCollections(params.id);
  const audios = await getArtistAudios(params.id);

  if (!artist) {
    throw new Response('Not Found', { status: 404 });
  }

  return json<ArtistLoaderData>({
    artist,
    collections,
    audios,
    id: params.id,
  });
};

const ArtistScreen = () => {
  const {
    artist,
    collections,
    audios,
    id,
  } = useLoaderData() as ArtistLoaderData;

  return (
    <section className="screen artist">
      <ProfileBanner data={artist} />
      <PopularAudios audios={audios}  />
      <Discography collections={collections} />
      <ProfileDetails data={artist} />
      <WalletDetails address={id} />
    </section>
  );
};

export default ArtistScreen;
