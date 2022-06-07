import React from 'react';
import { Link } from 'wouter';
import styles from './albumThumbnail.css';
import { AlbumType } from '../AlbumRow';
import album1 from '../../assets/images/mocks/album1.png';
import album2 from '../../assets/images/mocks/album2.png';
import album3 from '../../assets/images/mocks/album3.png';
import album4 from '../../assets/images/mocks/album4.png';
import album5 from '../../assets/images/mocks/album5.png';

const images: {[key: string]: string} = {album1, album2, album3, album4, album5};

export type AlbumThumbnailType = Pick<AlbumType, 'id'|'name'|'artistId'|'artistName'|'image'>

interface AlbumThumbnailProps {
  data: AlbumThumbnailType;
  className?: string;
  theme?: string;
}

const AlbumThumbnail = ({ data, theme = 'thumbnail' }: AlbumThumbnailProps) => (
  <div className={`${styles.wrapper} ${styles[theme]}`}>
    <Link href={`/albums/${data.id}`}>
      <figure>
        <img src={images[data.image]} alt={ data.name } />
      </figure>
      <div>
        <h5>{ data.name }</h5>
        <span>{ data.artistName }</span>
      </div>
    </Link>
  </div>
);

export default AlbumThumbnail;
