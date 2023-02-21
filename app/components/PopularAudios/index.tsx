import React from 'react';
import { Link } from 'react-router-dom';
import { PrimaryButton } from '../common/Button';
import EmptyState from '../common/EmptyState';
import EntityRow from '../Entity/EntityRow';
import { entityThemes } from '../Entity/types';
import { PopularAdiosProps } from './types';

const PopularAudios = ({ audios }: PopularAdiosProps) => {
  return (
    <section className='component popularAudios tabContainer'>
      {audios.length === 0 ? (
        <EmptyState
          title='You don’t have audios or collection yet.'
          subtitle='Start by creating your first collection, then add audios to it.'
          content={
            <Link to='/profile/createCollection'>
              <PrimaryButton className='newCollectionButton'>New collection</PrimaryButton>
            </Link>
          }
        />
      ) : (
        audios
          .filter((_, index) => index < 4)
          .map((audio, index) => (
            <EntityRow
              key={`track-${audio.audioID}-${index}`}
              data={audio}
              theme={entityThemes.normal}
            />
          ))
      )}
    </section>
  );
};

export default PopularAudios;
