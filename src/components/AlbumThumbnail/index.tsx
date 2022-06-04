import React from 'react';
import styles from './albumThumbnail.css';
import { AlbumType } from '../AlbumRow';
import trackImage from '../../assets/images/mocks/album7.png';

export type AlbumThumbnailType = Pick<AlbumType, 'id'|'name'|'artistId'|'artistName'|'image'>

interface AlbumThumbnailProps {
  data: AlbumThumbnailType;
  className?: string;
}

const Album = ({ data }: AlbumThumbnailProps) => (
  <div className={styles.wrapper}>
    <a>
      <figure>
        <img src={trackImage} alt={ data.name } />
      </figure>
      <h5>{ data.name }</h5>
      <span>{ data.artistName }</span>
    </a>
  </div>
);

export default Album;
