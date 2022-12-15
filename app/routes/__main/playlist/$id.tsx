/* External dependencies */
import React, { useContext, useEffect } from 'react';
import { json } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import invariant from 'tiny-invariant';

/* Internal dependencies */
import {
  getPlaylist,
  getPlaylistTracks,
} from '~/models/entity.server';
import { ProfileInfoType } from '~/context/profileContext/types';
import { ProfileContext } from '~/context/profileContext/profileContextProvider';
import { getSession } from '~/hooks/useSession';
import Collection from '~/components/Collection';
import PlaylistSummary from '~/components/Summary/PlaylistSummary';
import styles from '~/styles/routes/__main/playlist.css';

export function links() {
  return [{ rel: 'stylesheet', href: styles }];
}

type LoaderData = {
  playlist: Awaited<ReturnType<typeof getPlaylist>>;
  tracks: Awaited<ReturnType<typeof getPlaylistTracks>>;
  id: number;
  profileInfo: ProfileInfoType;
};

type loaderParams = {
  params: {
    id: number;
  },
  request: Request,
};

export const loader = async ({ params, request }: loaderParams) => {
  invariant(params.id, 'Expected params.id');

  const session = await getSession(
    request.headers.get('Cookie')
  );
  const profileInfo = {
    address: `${session.get('address') ?? ''}`,
    publicKey: `${session.get('publicKey') ?? ''}`,
    privateKey: `${session.get('privateKey') ?? ''}`,
  };

  const playlist = await getPlaylist(params.id);
  const tracks = await getPlaylistTracks(params.id);

  if (!playlist) {
    throw new Response('Not Found', { status: 404 });
  }

  return json<LoaderData>({
    profileInfo,
    playlist,
    tracks,
    id: params.id,
  });
};


const Playlist = () => {
  const { setProfileInfo } = useContext(ProfileContext);
  const {
    playlist,
    tracks,
    profileInfo,
  } = useLoaderData() as LoaderData;

  useEffect(() => {
    if (profileInfo.address) {
      setProfileInfo(profileInfo);
    }
  }, [profileInfo]);

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
