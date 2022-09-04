/* External dependencies */
import React from 'react';
import { json } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';

/* Internal dependencies */
import {
  getAlbum,
  getAlbumTracks,
} from '~/models/entity.server';
import Collection from '~/components/Collection';
import AlbumSummary from '~/components/Summary/AlbumSummary';
import { collectionThemes } from '~/components/Collection/types';
import styles from '~/styles/routes/__main/album.css';

export function links() {
  return [{ rel: 'stylesheet', href: styles }];
}

type LoaderData = {
  album: Awaited<ReturnType<typeof getAlbum>>;
  tracks: Awaited<ReturnType<typeof getAlbumTracks>>;
  id: number;
};

export const loader = async ({ params }) => {
  return json<LoaderData>({
    album: await getAlbum(params.id),
    tracks: await getAlbumTracks(params.id),
    id: params.id,
  });
};

const Album = () => {
  const {
    album,
    tracks,
  } = useLoaderData() as LoaderData;

  return (
    <section className="screen album">
      {
        <AlbumSummary data={album} />
      }
      <Collection
        items={!tracks?.length ? [] : tracks}
        className="trackList"
        theme={collectionThemes.wide}
      />
    </section>
  );
};

export default Album;
