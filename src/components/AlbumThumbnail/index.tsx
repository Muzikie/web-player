import React from 'react';
import { Link } from 'wouter';
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
    <Link href={`/albums/${data.id}`}>
      <figure>
        <img src={trackImage} alt={ data.name } />
      </figure>
      <h5>{ data.name }</h5>
      <span>{ data.artistName }</span>
    </Link>
  </div>
);

export default Album;
