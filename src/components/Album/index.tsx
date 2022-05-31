import React from 'react';
import styles from './album.css';

interface AlbumProps {
  data: {
    name: string;
    file: any;
  }
}

const Album = ({ data }: AlbumProps) => (
  <div className={styles.album}>
    <a>
      <img src={data.file} alt={data.name} />
    </a>
  </div>
);

export default Album;
