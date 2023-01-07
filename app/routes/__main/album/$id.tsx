/* External dependencies */
import React, { useContext, useEffect } from 'react';
import { json } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import invariant from 'tiny-invariant';

/* Internal dependencies */
import {
  getAlbum,
  getAlbumTracks,
} from '~/models/entity.server';
import { albumLoaderProps, AlbumLoaderData } from '../../types';
import { ProfileContext } from '~/context/profileContext/profileContextProvider';
import { getSession } from '~/hooks/useSession';
import Collection from '~/components/Collection';
import AlbumSummary from '~/components/Summary/AlbumSummary';
import { collectionThemes } from '~/components/Collection/types';
import styles from '~/css/routes/__main/album.css';

export function links() {
  return [{ rel: 'stylesheet', href: styles }];
}

export const loader = async ({ params, request }: albumLoaderProps) => {
  invariant(params.id, 'Expected params.id');

  const session = await getSession(
    request.headers.get('Cookie')
  );
  const profileInfo = {
    address: `${session.get('address') ?? ''}`,
    publicKey: `${Buffer.from(session.get('publicKey')).toString('hex') ?? ''}`,
    privateKey: `${Buffer.from(session.get('privateKey')).toString('hex') ?? ''}`,
  };

  return json<AlbumLoaderData>({
    profileInfo,
    album: await getAlbum(params.id),
    tracks: await getAlbumTracks(params.id),
    id: params.id,
  });
};

const Album = () => {
  const { setProfileInfo } = useContext(ProfileContext);
  const {
    album,
    tracks,
    profileInfo,
  } = useLoaderData() as AlbumLoaderData;

  useEffect(() => {
    if (profileInfo.address) {
      setProfileInfo(profileInfo);
    }
  }, [profileInfo]);

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
