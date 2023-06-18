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
  const { info } = useAccount();
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
          content: info.address === profile.creatorAddress ? (
            <Link to={ROUTES.UPLOAD_COLLECTION}>
              <PrimaryButton className='newCollectionButton'>New collection</PrimaryButton>
            </Link>
          ) : null,
        }}
      />
    </section>
  );
};

export default UserDiscography;
