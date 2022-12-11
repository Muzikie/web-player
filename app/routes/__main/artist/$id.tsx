/* External dependencies */
import React from 'react';
import { json } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import invariant from 'tiny-invariant';

/* Internal dependencies */
import {
  getArtist,
  getArtistAlbums,
  getArtistTracks,
} from '~/models/entity.server';
import Collection from '~/components/Collection';
import ArtistSummary from '~/components/Summary/ArtistSummary';
import styles from '~/styles/routes/__main/artist.css';

export function links() {
  return [{ rel: 'stylesheet', href: styles }];
}

type LoaderData = {
  artist: Awaited<ReturnType<typeof getArtist>>;
  albums: Awaited<ReturnType<typeof getArtistAlbums>>;
  tracks: Awaited<ReturnType<typeof getArtistTracks>>;
  id: number;
};

type loaderParams = {
  params: {
    id: number;
  },
};

export const loader = async ({ params }: loaderParams) => {
  invariant(params.id, 'Expected params.id');

  const artist = await getArtist(params.id);
  const albums = await getArtistAlbums(params.id);
  const tracks = await getArtistTracks(params.id);

  if (!artist) {
    throw new Response('Not Found', { status: 404 });
  }

  return json<LoaderData>({
    artist,
    albums,
    tracks,
    id: params.id,
  });
};

const Artist = () => {
  const {
    artist,
    albums,
    tracks,
  } = useLoaderData() as LoaderData;
  return (
    <section className="screen artist">
      <ArtistSummary data={artist} />
      <Collection
        title="Popular"
        items={!tracks?.length ? [] : tracks}
        className="popularTracks"
      />
      <Collection
        title="Discography"
        items={!albums.length ? [] : albums}
        className="discography"
      />
    </section>
  );
};

export default Artist;
