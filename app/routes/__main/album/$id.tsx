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
import { ProfileInfoType } from '~/context/profileContext/types';
import { ProfileContext } from '~/context/profileContext/profileContextProvider';
import { getSession } from '~/hooks/useSession';
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

  return json<LoaderData>({
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
  } = useLoaderData() as LoaderData;

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
