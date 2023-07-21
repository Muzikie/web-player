/* External dependencies */
import React from 'react';

/* Internal dependencies */
import List from '~/components/List';
import { UserDiscographyProps } from './types';

const UserDiscography = ({ collections }: UserDiscographyProps) => (
  <section className='component userDiscography tabContainer'>
    <header>
      <h3>Albums</h3>
    </header>
    <List
      items={!collections?.length ? [] : collections}
      emptyState={{
        title: 'No audios or collection to display.',
        subtitle: 'Start by creating your first collection, then add audios to it.',
      }}
    />
  </section>
);

export default UserDiscography;
