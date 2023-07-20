/* External dependencies */
import React from 'react';

/* Internal dependencies */
import { Link } from '~/components/common/Link';
import { PrimaryButton } from '~/components/common/Button';
import List from '~/components/List';
import { useAccount } from '~/hooks/useAccount/useAccount';
import { ROUTES } from '~/routes/routes';
import { UserDiscographyProps } from './types';

const UserDiscography = ({ collections, profile }: UserDiscographyProps) => {
  const { account } = useAccount();
  return (
    <section className='component userDiscography tabContainer'>
      <header>
        <h3>Albums</h3>
      </header>
      <List
        items={!collections?.length ? [] : collections}
        emptyState={{
          title: 'No audios or collection to display.',
          subtitle: 'Start by creating your first collection, then add audios to it.',
          content: account.address === profile.creatorAddress ? (
            <Link to={ROUTES.UPLOAD_COLLECTION.location}>
              <PrimaryButton className='newCollectionButton'>New collection</PrimaryButton>
            </Link>
          ) : null,
        }}
      />
    </section>
  );
};

export default UserDiscography;
