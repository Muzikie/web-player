import React from 'react';
import { Link } from 'wouter';
import { TrackThumbnailProps } from '../types';
import trackImage from '@mock/album7.png';
import styles from './trackThumbnail.css';

const TrackThumbnail = ({ data, className = '' }: TrackThumbnailProps) => (
  <section className={`${styles.wrapper} ${className}`}>
    <Link href={`/track/${data.id}`}>
      <figure>
        <img src={trackImage} alt={ data.name } />
      </figure>
    </Link>
  </section>
);

export default TrackThumbnail;
