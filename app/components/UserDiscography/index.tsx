/* External dependencies */
import React from 'react';

/* Internal dependencies */
import { entityThemes } from '~/components/Entity/types';
import { Link } from '~/components/common/Link';
import { ROUTES } from '~/routes/routes';
import { PrimaryButton } from '../common/Button';
import { UserDiscographyProps } from './types';
import List from '../List'

const UserDiscography = ({ collections }: UserDiscographyProps) => {
  return (
    <section className='component userDiscography tabContainer'>
      <header>
        <h3>Albums</h3>
      </header>
      <List
        items={!collections?.length ? [] : collections}
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

export default UserDiscography;
