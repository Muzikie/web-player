import React from 'react';
import styles from './artistLanding.css';
import data from './data.json';
import Collections from '../Collection';
import MostPopular from './MostPopular';
import ArtistSummary from './ArtistSummary';
import { TrackType } from '../TrackRow';
import { AlbumType } from '../AlbumRow';
import { ArtistType } from '../ArtistRow';

interface data {
  artist: ArtistType,
  mostPopular: TrackType[],
  albums: AlbumType[],
}

const ArtistDescription = () => (
  <section className={styles.wrapper}>
    <ArtistSummary data={data} />
    <MostPopular data={data.mostPopular} />
    <Collections
      className={styles.discography}
      title="Albums"
      direction="row"
      albums={data.albums}
    />
  </section>
);

export default ArtistDescription;
