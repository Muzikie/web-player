import React from 'react';
import { Link } from 'wouter';
import styles from './albumSummary.css';
import selena from '@mock/album1.png';
import { IconButton } from '../../common/Button';
import { EntityRowProps, AlbumType } from '../../Entity/types';


const AlbumSummary = ({ data }: EntityRowProps<AlbumType>) => {
  const year = (new Date(data.releaseDate * 1000)).getFullYear();
  return (
    <section className={styles.wrapper}>
      <header>
        <h1>{ data.name }</h1>
        <Link to={`/artists/${data.artistId}`} >
          <div className={styles.artist}>
            <figure>
              <img src={selena} alt={data.artistName} />
            </figure>
            <h4>{data.artistName}</h4>
          </div>
        </Link>
        <span className={styles.releaseDate}>{`${year} Album`}</span>

        <div className={styles.actionButtons}>
          <IconButton
            icon="play"
            theme="primary medium"
            className={styles.play}
            onClick={() => { console.log('Create the play logic'); }}
          />
          <IconButton
            icon="heart"
            theme="outlined small"
            className={styles.follow}
            onClick={(e) => { console.log('Create the follow logic', e); }}
          />
        </div>
      </header>
      <figure className={styles.photo}>
        <img src={selena} alt={ data.name } />
      </figure>
    </section>
  );
};

export default AlbumSummary;
