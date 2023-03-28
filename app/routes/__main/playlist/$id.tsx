/* External dependencies */
import React from 'react';
import { json } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import invariant from 'tiny-invariant';

/* Internal dependencies */
import {
  getPlaylist,
  getPlaylistAudios,
} from '~/models/entity.server';
import { redirect } from '@remix-run/node';
import { getSession } from '~/hooks/useSession';
import { playlistLoaderParams, PlaylistLoaderData } from '../../types';
import List from '~/components/List';
import PlaylistSummary from '~/components/Summary/PlaylistSummary';
import styles from '~/css/routes/__main/playlist.css';

export function links() {
  return [{ rel: 'stylesheet', href: styles }];
}

export const loader = async ({ params, request }: playlistLoaderParams) => {
  const session = await getSession(
    request.headers.get('Cookie')
  );
  const agreement = session.get('agreement');
  const address = session.get('address');
  if (!agreement && address) {
    // redirect users to agreement page when the agreement cookie is not set
    return redirect('/agreement')
  }

  invariant(params.id, 'Expected params.id');
  const playlist = await getPlaylist(params.id);
  const audios = await getPlaylistAudios(params.id);

  if (!playlist) {
    throw new Response('Not Found', { status: 404 });
  }

  return json<PlaylistLoaderData>({
    playlist,
    audios,
    id: params.id,
  });
};

const PlaylistScreen = () => {
  const {
    playlist,
    audios,
  } = useLoaderData() as PlaylistLoaderData;

  return (
    <section className="screen playlist">
      <PlaylistSummary data={playlist} />
      <List
        className="audioList"
        items={!audios.length ? [] : audios}
      />
    </section>
  );
};

export default PlaylistScreen;
