/* External dependencies */
import React, { useMemo } from 'react';
import { json } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';

/* Internal dependencies */
import EntityRow from '~/components/Entity/EntityRow';
import { entityMode, TrackType } from '~/components/Entity/types';
import { UserDiscographyLoaderData, ProfileLoaderProps } from '../../../types';
import { getUserAlbums, getUserTracks } from '~/models/entity.server';

export const loader = async ({ params, request }: ProfileLoaderProps) => {
  return json<UserDiscographyLoaderData>({
    albums: await getUserAlbums('some'),
    tracks: await getUserTracks('some'),
  });
};

const UserDiscography = () => {
  const {
    tracks,
    albums,
  } = useLoaderData() as UserDiscographyLoaderData;

  const discography = useMemo(() => {
    return tracks.reduce((acc: {[key: string]: TrackType[]}, item: TrackType) => {
      if (!acc[item.albumId]) {
        acc[item.albumId] = [];
      }

      acc[item.albumId].push(item);
      return acc;
    }, {});
  }, [albums]);

  return (
    <section className="component createEntity tabContainer">
      <div>
        {
          albums.map((album, index) => (
            <section key={`album-${album.id}-${index}`}>
              <EntityRow
                data={albums[0]}
                mode={entityMode.edit}
              />
              <section className='albumTracks'>
                {
                  discography[album.id].map((track, index) => (
                    <EntityRow
                      key={`track-${track.id}-${index}`}
                      data={track}
                      mode={entityMode.edit}
                    />
                  ))
                }
              </section>
            </section>
          ))
        }
      </div>
    </section>
  );
};

export default UserDiscography;
