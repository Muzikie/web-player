/* External dependencies */
import React from 'react';
import { json } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';

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

export const loader = async ({ params }) => {
  return json<LoaderData>({
    artist: await getArtist(params.id),
    albums: await getArtistAlbums(params.id),
    tracks: await getArtistTracks(params.id),
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
