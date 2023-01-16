/* External dependencies */
import React, { useMemo } from 'react';

/* Internal dependencies */
import EntityRow from '~/components/Entity/EntityRow';
import { Audio } from '~/configs';
import { entityMode } from '~/components/Entity/types';
import NoSubscription from '../ActiveSubscription/NoSubscription';
import { PrimaryButton } from '../common/Button';
import { UserDiscographyProps } from './types';

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
    <section className="component userDiscography tabContainer">
      {collections.length === 0 ?
        <NoSubscription
          title="You don’t have audios or collection yet."
          content={
            <div>
              <p>Start by creating your first collection, then add audios to it.</p>
              <PrimaryButton className="newCollectionButton">New collection</PrimaryButton>
            </div>
          }
        /> :
        <div>
          {
            collections.map((collection, index) => (
              <section key={`collection-${collection.collectionID}-${index}`}>
                <EntityRow
                  data={collections[index]}
                  mode={entityMode.edit}
                />
                <section className='albumTracks'>
                  {
                    discography[collection.collectionID]
                      ? discography[collection.collectionID].map((audio, index) => (
                        <EntityRow
                          key={`track-${audio.audioID}-${index}`}
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
      }
    </section>
  );
};

export default UserDiscography;
