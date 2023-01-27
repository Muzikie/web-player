/* External dependencies */
import React, { useMemo } from 'react';

/* Internal dependencies */
import EntityRow from '~/components/Entity/EntityRow';
import { Audio } from '~/configs';
import { entityMode } from '~/components/Entity/types';
import { Link } from '~/components/common/Link';
import EmptyState from '~/components/common/EmptyState';
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
      {
        collections.length === 0
          ? (
            <EmptyState
              title="You don’t have audios or collection yet."
              subtitle="Start by creating your first collection, then add audios to it."
              content={
                <Link to="/profile/createCollection">
                  <PrimaryButton
                    className="newCollectionButton">
                      New collection
                  </PrimaryButton>
                </Link>
              }
            />
          )
          : (
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
          )
      }
    </section>
  );
};

export default UserDiscography;
