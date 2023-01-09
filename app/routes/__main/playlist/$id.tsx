/* External dependencies */
import React from 'react';
import { json } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import invariant from 'tiny-invariant';

/* Internal dependencies */
import {
  getPlaylist,
  getPlaylistTracks,
} from '~/models/entity.server';
import { playlistLoaderParams, PlaylistLoaderData } from '../../types';
import Collection from '~/components/Collection';
import PlaylistSummary from '~/components/Summary/PlaylistSummary';
import styles from '~/css/routes/__main/playlist.css';

export function links() {
  return [{ rel: 'stylesheet', href: styles }];
}

export const loader = async ({ params }: playlistLoaderParams) => {
  invariant(params.id, 'Expected params.id');

  const playlist = await getPlaylist(params.id);
  const tracks = await getPlaylistTracks(params.id);

  if (!playlist) {
    throw new Response('Not Found', { status: 404 });
  }

  return json<PlaylistLoaderData>({
    playlist,
    tracks,
    id: params.id,
  });
};


const Playlist = () => {
  const {
    playlist,
    tracks,
  } = useLoaderData() as PlaylistLoaderData;

  return (
    <section className="screen playlist">
      <PlaylistSummary data={playlist} />
      <Collection
        className="trackList"
        items={!tracks.length ? [] : tracks}
      />
    </section>
  );
};

export default Playlist;
