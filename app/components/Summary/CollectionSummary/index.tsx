import React from 'react';

/* Internal dependencies */
//import { IconButton } from '~/components/common/Button';
import { API_URLS, SUFFIXES } from '~/configs';
import Image from '~/components/common/Image';
import ProfileLink from './ProfileLink';
import { CollectionSummaryProps } from './types';

const CollectionSummary = ({ collection, profile }: CollectionSummaryProps) => (
  <section className="component collectionSummary">
    <header>
      <h2>{collection.name}</h2>
      <ProfileLink profile={profile} />
      <span className="releaseDate">{`${collection.releaseYear} Collection`}</span>
      {/* <div className="actionButtons">
        <IconButton
          icon="play"
          theme="primary medium"
          className="play"
          onClick={() => { console.log('Create the play logic'); }}
        />
        <IconButton
          icon="heart"
          theme="outlined small"
          className="follow"
          onClick={(e) => { console.log('Create the follow logic', e); }}
        />
      </div> */}
    </header>
    <figure className="photo">
      <Image
        src={`${API_URLS.STORAGE}/${collection.collectionID}${SUFFIXES.collection.primary}.jpg`}
        placeHolder="/images/collection.jpg"
        alt={collection.name}
      />
    </figure>
  </section>
);

export default CollectionSummary;
