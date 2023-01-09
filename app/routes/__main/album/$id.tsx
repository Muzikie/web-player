/* External dependencies */
import React from 'react';
import { json } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import invariant from 'tiny-invariant';

/* Internal dependencies */
import {
  getAlbum,
  getAlbumTracks,
} from '~/models/entity.server';
import { albumLoaderProps, AlbumLoaderData } from '../../types';
import Collection from '~/components/Collection';
import AlbumSummary from '~/components/Summary/AlbumSummary';
import { collectionThemes } from '~/components/Collection/types';
import styles from '~/css/routes/__main/album.css';

export function links() {
  return [{ rel: 'stylesheet', href: styles }];
}

export const loader = async ({ params }: albumLoaderProps) => {
  invariant(params.id, 'Expected params.id');

  return json<AlbumLoaderData>({
    album: await getAlbum(params.id),
    tracks: await getAlbumTracks(params.id),
    id: params.id,
  });
};

const Album = () => {
  const {
    album,
    tracks,
  } = useLoaderData() as AlbumLoaderData;


  return (
    <section className="screen album">
      {
        album && <AlbumSummary data={album} />
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
