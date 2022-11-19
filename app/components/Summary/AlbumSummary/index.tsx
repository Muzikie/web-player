import React from 'react';
import { Link } from '@remix-run/react';
import { IconButton } from '~/components/common/Button';
import { EntityRowProps, AlbumType } from '~/components/Entity/types';

const AlbumSummary = ({ data }: EntityRowProps<AlbumType>) => {
  const year = (new Date(data.releaseDate * 1000)).getFullYear();
  return (
    <section className="component albumSummary">
      <header>
        <h1>{ data.name }</h1>
        <Link to={`/artist/${data.artistId}`} className="artist">
          <figure>
            <img src={data.image} alt={data.artistName} />
          </figure>
          <h4>{data.artistName}</h4>
        </Link>
        <span className="releaseDate">{`${year} Album`}</span>

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
        <img src={data.image} alt={ data.name } />
      </figure>
    </section>
  );
};

export default AlbumSummary;
