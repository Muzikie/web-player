import React from 'react';
import { TrackType } from '../TrackRow';
import trackImage from '../../assets/images/mocks/album7.png';
import styles from './trackThumbnail.css';

export type TrackThumbnailType = Pick<TrackType, 'id'|'name'|'artistId'|'artistName'|'image'>

interface TrackThumbnailProps {
  data: TrackThumbnailType;
  className?: string;
}

const TrackThumbnail = ({ data, className = '' }: TrackThumbnailProps) => (
  <section className={`${styles.wrapper} ${className}`}>
    <a>
      <div className={styles.albumArt}>
        <figure>
          <img src={trackImage} alt={ data.name } />
        </figure>
      </div>
      <h5>{ data.name }</h5>
      <h5>{ data.artistName }</h5>
    </a>
  </section>
);

export default TrackThumbnail;
