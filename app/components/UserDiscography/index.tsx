/* External dependencies */
import React, { useMemo } from 'react';

/* Internal dependencies */
import { Audio } from '~/configs';
import { UserDiscographyProps } from './types';
import EntityRow from '../Entity/EntityRow';
import { entityMode, entityThemes } from '../Entity/types';

const UserDiscography = ({ audios, collections }: UserDiscographyProps) => {
  const discography = useMemo(() => {
    return audios.reduce((acc: { [key: string]: Audio[] }, item: Audio) => {
      if (!acc[item.collectionID]) {
        acc[item.collectionID] = [];
      }

      acc[item.collectionID].push(item);
      return acc;
    }, {});
  }, [collections]);

  return (
    <section className='component userDiscography tabContainer'>
      <section className='generalInfo wrapper'>
        <figure className="photo">
          <img src="http://164.90.185.53:8080/streamer/53747265616d6c696e65724d7220536d697468-cover.jpg" alt="Streamliner" />
        </figure>
        <div>
          <h3>Selena Gomez</h3>
          <section className='popularSongs'>
            <h3>Popular Songs</h3>
            {audios.map((audio, index) => {
              if (index <= 4) {
                return (
                  <EntityRow
                    key={`track-${audio.audioID}-${index}`}
                    data={audio}
                    theme={entityThemes.withCover}
                  />
                );
              }
            })}
          </section>
        </div>
      </section>
    </section>
  );
};

export default UserDiscography;

