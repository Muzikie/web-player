/* External dependencies */
import React, { useMemo } from 'react';

/* Internal dependencies */
import EntityRow from '~/components/Entity/EntityRow';
import { TrackType, entityMode } from '~/components/Entity/types';
import { UserDiscographyProps } from './types';

const UserDiscography = ({ tracks, albums }: UserDiscographyProps) => {
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
    <section className="component userDiscography tabContainer">
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
