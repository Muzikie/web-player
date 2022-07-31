import React from 'react';
import { Link } from 'wouter';
import styles from './playlistThumbnail.css';
import { PlaylistThumbnailProps } from '../types';
import playlist1 from '../../../../mock/playlistImageMock1.png';

const PlaylistThumbnail = ({ data, theme = 'thumbnail' }: PlaylistThumbnailProps) => (
  <div className={`${styles.wrapper} ${styles[theme]} ${styles[theme]}`}>
    <Link href={`/playlist/${data.id}`}>
      <figure>
        <img src={playlist1} alt={ data.name } />
      </figure>
      <div>
        <h5>{ data.name }</h5>
        <span>{`${data.tracks.length} tracks`}</span>
      </div>
    </Link>
  </div>
);

export default PlaylistThumbnail;
