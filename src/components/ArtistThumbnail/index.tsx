import React from 'react';
import { Link } from 'wouter';
import { ArtistType } from '../ArtistRow';
import trackImage from '../../assets/images/mocks/album7.png';
import styles from './artistThumbnail.css';

export type ArtistThumbnailType = Pick<ArtistType, 'id'|'name'|'image'>

interface ArtistThumbnailProps {
  data: ArtistThumbnailType;
  className?: string;
  theme?: string;
}

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
