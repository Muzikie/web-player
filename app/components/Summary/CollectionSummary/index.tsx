import React from 'react';

/* Internal dependencies */
//import { IconButton } from '~/components/common/Button';
import { API_URLS } from '~/configs';
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
      <img src={`${API_URLS.STREAMER}/${collection.collectionID}-cover.jpg`} alt={collection.name} />
    </figure>
  </section>
);

export default CollectionSummary;
