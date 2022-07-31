import React from 'react';
import { Link } from 'wouter';
import { ArtistThumbnailProps } from '../types';
import trackImage from '@mock/album7.png';
import styles from './artistThumbnail.css';

const ArtistThumbnail = ({ data, className = '', theme = 'thumbnail' }: ArtistThumbnailProps) => (
  <section className={`${styles.wrapper} ${styles[theme]} ${className}`}>
    <Link href={`/artist/${data.id}`}>
      <figure>
        <img src={trackImage} alt={ data.name } />
      </figure>
      <div>
        <h5>{ data.name }</h5>
      </div>
    </Link>
  </section>
);

export default ArtistThumbnail;
