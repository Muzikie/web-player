import React from 'react';
import { Link } from 'react-router-dom';
import { ROUTES } from '~/routes/routes';
import { PrimaryButton } from '../common/Button';
import { entityThemes } from '../Entity/types';
import List from '../List';
import { liskThemes } from '../List/types';
import { PopularAdiosProps } from './types';

const PopularAudios = ({ audios }: PopularAdiosProps) => (
  <section className='component popularAudios'>
    <header className='popularHeader'>
      <h3>Most popular</h3>
    </header>
    <List
      theme={liskThemes.wide}
      className="audiosLists"
      itemTheme={entityThemes.ProfilePage}
      items={audios}
      showRowNumber
      emptyState={{
        title: 'You don’t have audios or collection yet.',
        subtitle: 'Start by creating your first collection, then add audios to it.',
        content: (
          <Link to={ROUTES.UPLOAD_COLLECTION.location}>
            <PrimaryButton className='newCollectionButton'>New collection</PrimaryButton>
          </Link>
        ),
      }}
    />
  </section>
);

export default PopularAudios;
