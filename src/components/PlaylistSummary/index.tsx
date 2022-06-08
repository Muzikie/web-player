import React from 'react';
import styles from './playlistSummary.css';
import selena from '../../assets/images/mocks/selena-gomez.jpg';
import { IconButton, PlayButton } from '../common/Button';
import { PlaylistType } from '../PlaylistRow';

interface PlaylistSummaryProps {
  data: PlaylistType;
}

const PlaylistSummary = ({ data }: PlaylistSummaryProps) => (
  <section className={styles.wrapper}>
    <figure className={styles.photo}>
      <img src={selena} alt={data.name} />
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
        <h5>{`${data.tracks.length} tracks`}</h5>
      </div>
    </article>
  </section>
);

export default PlaylistSummary;
