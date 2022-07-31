import React from 'react';
import { Link } from 'wouter';
import styles from './albumThumbnail.css';
import { AlbumThumbnailProps } from '../types';
import mockImage from '@mock/album1.png';

const AlbumThumbnail = ({ data, className = '' }: AlbumThumbnailProps) => (
  <section className={`${styles.wrapper} ${className}`}>
    <Link href={`/albums/${data.id}`}>
      <figure>
        <img src={mockImage} alt={ data.name } />
      </figure>
    </Link>
  </section>
);

export default AlbumThumbnail;
