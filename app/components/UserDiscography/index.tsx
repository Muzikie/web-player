/* External dependencies */
import React, { useMemo } from 'react';

/* Internal dependencies */
import EntityRow from '~/components/Entity/EntityRow';
import { AudioType, entityMode } from '~/components/Entity/types';
import { UserDiscographyProps } from './types';

const UserDiscography = ({ audios, collections }: UserDiscographyProps) => {
  const discography = useMemo(() => {
    return audios.reduce((acc: {[key: string]: AudioType[]}, item: AudioType) => {
      if (!acc[item.collectionID]) {
        acc[item.collectionID] = [];
      }

      acc[item.collectionID].push(item);
      return acc;
    }, {});
  }, [collections]);

  return (
    <section className="component userDiscography tabContainer">
      <div>
        {
          collections.map((collection, index) => (
            <section key={`collection-${collection.collectionID}-${index}`}>
              <EntityRow
                data={collections[index]}
                mode={entityMode.edit}
              />
              <section className='collectionAudios'>
                {
                  discography[collection.collectionID]
                    ? discography[collection.collectionID].map((audio, index) => (
                      <EntityRow
                        key={`audio-${audio.audioID}-${index}`}
                        data={audio}
                        mode={entityMode.edit}
                      />
                    ))
                    : null
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
