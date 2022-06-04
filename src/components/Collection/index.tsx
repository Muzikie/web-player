import React from 'react';
import styles from './collection.css';
import ArtistThumbnail, { ArtistThumbnailType } from '../ArtistThumbnail';
import AlbumThumbnail, { AlbumThumbnailType } from '../AlbumThumbnail';
import TrackThumbnail, { TrackThumbnailType } from '../TrackThumbnail';

interface CollectionProps {
  className?: string;
  direction?: string;
  title?: string;
  artists?: ArtistThumbnailType[];
  albums?: AlbumThumbnailType[];
  tracks?: TrackThumbnailType[];
}

const Collection = ({
  className = '',
  direction = 'column',
  title,
  artists = [],
  albums = [],
  tracks = [],
}: CollectionProps) => {
  return (
    <section className={`${styles.wrapper} ${styles[direction]} ${className}`}>
      {
        title ? (
          <header>
            <h4>{title}</h4>
          </header>
        ): null
      }
      {
        artists.map((item) => (<ArtistThumbnail key={item.id} data={item} />))
      }
      {
        albums.map((item) => (<AlbumThumbnail key={item.id} data={item} />))
      }
      {
        tracks.map((item) => (<TrackThumbnail key={item.id} data={item} />))
      }
    </section>
  );
}

export default Collection;
