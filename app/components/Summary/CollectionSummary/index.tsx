import React from 'react';

/* Internal dependencies */
import { IconButton } from '~/components/common/Button';
import { API_URLS } from '~/configs';
import ArtistLink from './ArtistLink';
import { CollectionSummaryProps } from './types';

const CollectionSummary = ({ collection, artist }: CollectionSummaryProps) => (
  <section className="component collectionSummary">
    <header>
      <h1>{ collection.name }</h1>
      <ArtistLink artist={artist} />
      <span className="releaseDate">{`${collection.releaseYear} Collection`}</span>

      <div className="actionButtons">
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
      </div>
    </header>
    <figure className="photo">
      <img src={`${API_URLS.STREAMER}/${collection.collectionID}-cover.jpg`} alt={ collection.name } />
    </figure>
  </section>
);

export default CollectionSummary;
