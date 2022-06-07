import React from 'react';
import { TrackType } from '../TrackRow';
import trackImage from '../../assets/images/mocks/album7.png';
import styles from './trackThumbnail.css';

export type TrackThumbnailType = Pick<TrackType, 'id'|'name'|'artistId'|'artistName'|'image'>

interface TrackThumbnailProps {
  data: TrackThumbnailType;
  className?: string;
  theme?: string;
}

const TrackThumbnail = ({ data, className = '', theme = 'thumbnail' }: TrackThumbnailProps) => (
  <section className={`${styles.wrapper} ${styles[theme]} ${className}`}>
    <a>
      <div className={styles.albumArt}>
        <figure>
          <img src={trackImage} alt={ data.name } />
        </figure>
      </div>
      <div>
        <h5>{ data.name }</h5>
        <h5>{ data.artistName }</h5>
      </div>
    </a>
  </section>
);

export default TrackThumbnail;
