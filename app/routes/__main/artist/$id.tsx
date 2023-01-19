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
import List from '~/components/List';
import ArtistSummary from '~/components/Summary/ArtistSummary';
import styles from '~/css/routes/__main/artist.css';
import { artistLoaderProps, ArtistLoaderData } from '../../types';

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
  } = useLoaderData() as ArtistLoaderData;

  return (
    <section className="screen artist">
      <ArtistSummary data={artist} />
      <List
        title="Popular"
        items={!audios?.length ? [] : audios}
        className="popularAudios"
      />
      <List
        title="Discography"
        items={!collections.length ? [] : collections}
        className="discography"
      />
    </section>
  );
};

export default ArtistScreen;
