import React from 'react';
import { Link } from 'wouter';
import { ArtistType } from '../types';
import trackImage from '@mock/album7.png';
import styles from './artistRow.css';

export type ArtistRowType = Pick<ArtistType, 'id'|'name'|'image'>

interface ArtistRowProps {
  data: ArtistRowType;
  className?: string;
  theme?: string;
}

const ArtistRow = ({ data, className = '' }: ArtistRowProps) => (
  <section className={`${styles.wrapper} ${className}`}>
    <Link href={`/artist/${data.id}`}>
      <div className={styles.primary}>
        <figure>
          <img src={trackImage} alt={ data.name } />
        </figure>
        <div className={styles.title}>
          <h5>{ data.name }</h5>
          <span>4 Albums and several singles</span>
        </div>
      </div>

      <div className={styles.extra}>
        <ul>
          <li className={styles.like}></li>
          <li className={styles.stats}></li>
          <li className={styles.duration}></li>
          <li className={styles.more}></li>
        </ul>
      </div>
    </Link>
  </section>
);

export default ArtistRow;
