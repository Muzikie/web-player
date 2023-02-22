import React from 'react';
import { Link } from 'react-router-dom';
import { ROUTES } from '~/routes/routes'
import { PrimaryButton } from '../common/Button';
import { entityThemes } from '../Entity/types';
import List from '../List'
import { liskThemes } from '../List/types'
import { PopularAdiosProps } from './types';

const PopularAudios = ({ audios }: PopularAdiosProps) => {
  return (
    <section className='component popularAudios'>
      <List
        theme={liskThemes.normal}
        itemTheme={entityThemes.normal}
        items={audios}
        emptyState={{
          title: 'You don’t have audios or collection yet.',
          subtitle: 'Start by creating your first collection, then add audios to it.',
          content: (
            <Link to={ROUTES.UPLOAD_COLLECTION}>
              <PrimaryButton className='newCollectionButton'>New collection</PrimaryButton>
            </Link>
          ),
        }}
      />
    </section>
  );
};

export default PopularAudios;
