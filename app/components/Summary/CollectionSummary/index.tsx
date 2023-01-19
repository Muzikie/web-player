import React from 'react';

/* Internal dependencies */
import { Link } from '~/components/common/Link';
import { IconButton } from '~/components/common/Button';
import { API_URLS } from '~/constants/api';
import { EntityRowProps, CollectionType } from '~/components/Entity/types';
import { getID } from '~/components/Entity/utils';

const CollectionSummary = ({ data }: EntityRowProps<CollectionType>) => {
  const id = getID(data);
  return (
    <section className="component collectionSummary">
      <header>
        <h1>{ data.name }</h1>
        <Link to={`/artist/${data.creatorAddress}`} className="artist">
          <figure>
            <img src={`${API_URLS.STREAMER}/${id}.jpg`} alt={data.artistName} />
          </figure>
          <h4>{data.artistName}</h4>
        </Link>
        <span className="releaseDate">{`${data.releaseYear} Collection`}</span>

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
        <img src={`${API_URLS.STREAMER}/${id}.jpg`} alt={ data.name } />
      </figure>
    </section>
  );
};

export default CollectionSummary;
