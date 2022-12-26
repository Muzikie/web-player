/* External dependencies */
import React, { useContext, useEffect } from 'react';
import { json } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import invariant from 'tiny-invariant';

/* Internal dependencies */
import {
  getArtist,
  getArtistAlbums,
  getArtistTracks,
} from '~/models/entity.server';
import { ProfileContext } from '~/context/profileContext/profileContextProvider';
import { getSession } from '~/hooks/useSession';
import Collection from '~/components/Collection';
import ArtistSummary from '~/components/Summary/ArtistSummary';
import styles from '~/styles/routes/__main/artist.css';
import { artistLoaderProps, ArtistLoaderData } from '../../types';

export function links() {
  return [{ rel: 'stylesheet', href: styles }];
}

export const loader = async ({ params, request }: artistLoaderProps) => {
  invariant(params.id, 'Expected params.id');

  const session = await getSession(
    request.headers.get('Cookie')
  );
  const profileInfo = {
    address: `${session.get('address') ?? ''}`,
    publicKey: `${Buffer.from(session.get('publicKey')).toString('hex') ?? ''}`,
    privateKey: `${Buffer.from(session.get('privateKey')).toString('hex') ?? ''}`,
  };

  const artist = await getArtist(params.id);
  const albums = await getArtistAlbums(params.id);
  const tracks = await getArtistTracks(params.id);

  if (!artist) {
    throw new Response('Not Found', { status: 404 });
  }

  return json<ArtistLoaderData>({
    profileInfo,
    artist,
    albums,
    tracks,
    id: params.id,
  });
};

const Artist = () => {
  const { setProfileInfo } = useContext(ProfileContext);
  const {
    artist,
    albums,
    tracks,
    profileInfo,
  } = useLoaderData() as ArtistLoaderData;

  useEffect(() => {
    if (profileInfo.address) {
      setProfileInfo(profileInfo);
    }
  }, [profileInfo]);

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
