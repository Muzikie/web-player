import React from 'react';
import styles from './collection.css';
import ArtistThumbnail, { ArtistThumbnailType } from '../ArtistThumbnail';
import AlbumThumbnail, { AlbumThumbnailType } from '../AlbumThumbnail';
import TrackThumbnail, { TrackThumbnailType } from '../TrackThumbnail';
import PlaylistThumbnail, { PlaylistThumbnailType } from '../PlaylistThumbnail';

interface CollectionProps {
  className?: string;
  direction?: string;
  title?: string;
  itemTheme?: string;
  artists?: ArtistThumbnailType[];
  albums?: AlbumThumbnailType[];
  tracks?: TrackThumbnailType[];
  playlists?: PlaylistThumbnailType[];
}

const Collection = ({
  className = '',
  direction = 'column',
  itemTheme,
  title,
  artists = [],
  albums = [],
  tracks = [],
  playlists = [],
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
      <div className={styles.itemsContainer}>
        {
          artists.map((item) => (<ArtistThumbnail key={item.id} data={item} theme={itemTheme} />))
        }
        {
          albums.map((item) => (<AlbumThumbnail key={item.id} data={item} theme={itemTheme} />))
        }
        {
          tracks.map((item) => (<TrackThumbnail key={item.id} data={item} theme={itemTheme} />))
        }
        {
          playlists.map((item) => (<PlaylistThumbnail key={item.id} data={item} theme={itemTheme} />))
        }
      </div>
    </section>
  );
}

export default Collection;
