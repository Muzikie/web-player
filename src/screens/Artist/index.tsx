import React from 'react';
import styles from './artist.css';
import data from './data.json';
import Collections from '../../components/Collection';
import MostPopular from '../../components/MostPopular';
import ArtistSummary from '../../components/ArtistSummary';
import { TrackType } from '../../components/TrackRow';
import { AlbumType } from '../../components/AlbumRow';
import { ArtistType } from '../../components/ArtistRow';

interface data {
  artist: ArtistType,
  mostPopular: TrackType[],
  albums: AlbumType[],
}

const Artist = () => (
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

export default Artist;
