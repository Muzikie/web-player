import React from 'react';
import styles from './albumSummary.css';
import selena from '../../assets/images/mocks/album1.png';
import { IconButton, PlayButton } from '../common/button';
import { AlbumType } from '../AlbumRow';

interface AlbumSummaryProps {
  data: AlbumType;
}

const AlbumSummary = ({ data }: AlbumSummaryProps) => (
  <section className={styles.wrapper}>
    <figure className={styles.albumArt}>
      <img src={selena} alt={ data.name } />
    </figure>

    <article>
      <footer>
        <PlayButton
          className={styles.play}
          onClick={() => { console.log('Create the play logic'); }}
        />
        <IconButton
          icon="heart"
          className={styles.follow}
          onClick={(e) => { console.log('Create the follow logic', e); }}
        />
      </footer>
      <div>
        <h1>{ data.name }</h1>
        <h5>{ data.description }</h5>
      </div>
    </article>
  </section>
);

export default AlbumSummary;
