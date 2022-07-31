import React from 'react';
import { Link } from 'wouter';
import { IconButton } from '../../common/Button';
import AlbumThumbnail from '../AlbumThumbnail';
import styles from './albumRow.css';
import { AlbumRowProps } from '../types';

const AlbumRow = ({ data, theme = '', className = '' }: AlbumRowProps) => (
  <Link
    href={`/albums/${data.id}`}
    className={`${styles.wrapper} ${styles[theme]} ${className}`}
  >
    <div className={styles.primaryInfo}>
      <AlbumThumbnail
        data={data}
        className={styles.thumbnail}
      />
      <div className={styles.text}>
        <h4 className={styles.albumName}>{ data.name }</h4>
        <span className={styles.artistName}>{ data.artistName }</span>
      </div>
    </div>

    <div className={styles.extraInfo}>
      <ul>
        <IconButton
          icon="heart"
          className={styles.likeButton}
          onClick={() => console.log('Implement like functionality')}
        />
        <IconButton
          icon="more-vertical"
          className={styles.contextMenu}
          onClick={() => console.log('Implement context menu functionality')}
        />
      </ul>
    </div>
  </Link>
);

export default AlbumRow;
