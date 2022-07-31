import React from 'react';
import styles from './collection.css';
import ArtistRow from '../Artist/ArtistRow';
import AlbumRow from '../Album/AlbumRow';
import TrackRow from '../Track/TrackRow';
import PlaylistRow from '../Playlist/PlaylistRow';
import { CollectionProps } from './types';



const Collection = ({
  className = '',
  direction = 'vertical',
  itemsPerColumn = '1',
  itemTheme,
  title,
  artists = [],
  albums = [],
  tracks = [],
  playlists = [],
}: CollectionProps) => {
  const rowItems = `rowItems-${itemsPerColumn}`
  return (
    <section className={`${styles.wrapper} ${styles[direction]} ${className}`}>
      {
        title ? (
          <header>
            <h4>{title}</h4>
          </header>
        ): null
      }
      <div className={styles.itemsFrame}>
        <div className={`${styles.itemsContainer} ${styles[rowItems]}`}>
          {
            artists.map((item) => (<ArtistRow key={item.id} data={item} theme={itemTheme} />))
          }
          {
            albums.map((item) => (<AlbumRow key={item.id} data={item} theme={itemTheme} />))
          }
          {
            tracks.map((track) => (<TrackRow key={track.id} data={track} theme={itemTheme}  />))
          }
          {
            playlists.map((item) => (<PlaylistRow key={item.id} data={item} theme={itemTheme} />))
          }
        </div>
      </div>
    </section>
  );
}

export default Collection;
