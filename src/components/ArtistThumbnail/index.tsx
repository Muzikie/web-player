import React from 'react';
import { ArtistType } from '../ArtistRow';
import trackImage from '../../assets/images/mocks/album7.png';
import styles from './artistThumbnail.css';

export type ArtistThumbnailType = Pick<ArtistType, 'id'|'name'|'image'>

interface ArtistThumbnailProps {
  data: ArtistThumbnailType;
  className?: string;
}

const ArtistThumbnail = ({ data, className = '' }: ArtistThumbnailProps) => (
  <section className={`${styles.wrapper} ${className}`}>
    <a>
      <div className={styles.albumArt}>
        <figure>
          <img src={trackImage} alt={ data.name } />
        </figure>
      </div>
      <h4>{ data.name }</h4>
    </a>
  </section>
);

export default ArtistThumbnail;
