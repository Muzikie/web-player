import React from 'react';
import { Link } from 'wouter';
import styles from './playlistThumbnail.css';
import { PlaylistType } from '../PlaylistRow';
import playlist1 from '../../assets/images/mocks/album1.png';
import playlist2 from '../../assets/images/mocks/album2.png';

const images: {[key: string]: string} = {playlist1, playlist2};

export type PlaylistThumbnailType = Pick<PlaylistType, 'id'|'name'|'tracks'|'image'>

interface PlaylistThumbnailProps {
  data: PlaylistThumbnailType;
  className?: string;
  theme?: string;
}

const PlaylistThumbnail = ({ data, theme = 'thumbnail' }: PlaylistThumbnailProps) => (
  <div className={`${styles.wrapper} ${styles[theme]} ${styles[theme]}`}>
    <Link href={`/playlist/${data.id}`}>
      <figure>
        <img src={images[data.image]} alt={ data.name } />
      </figure>
      <div>
        <h5>{ data.name }</h5>
        <span>{`${data.tracks.length} tracks` }</span>
      </div>
    </Link>
  </div>
);

export default PlaylistThumbnail;
