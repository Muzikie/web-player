import React from 'react';
import styles from './player.css';
import { IconButton } from '../common/Button';
import AlbumThumbnail from '../Album/AlbumThumbnail';

import artistAlbums from '@mock/albums.json';

const Player = () => {
  return (
    <section className={styles.wrapper}>
      <section className={styles.playingMusic}>
        <AlbumThumbnail data={artistAlbums[0]} className="circle" />
        <header>
          <h5>Love the Way You Lie</h5>
          <span>Rihanna</span>
        </header>
      </section>
      
      <section className={styles.seek}>
        <span className={styles.bar}></span>
        <time><small>1:43</small></time>
      </section>

      <section className={styles.controls}>
        <IconButton
          icon="rewind"
          className={styles.rewind}
          onClick={(e) => { console.log('Implement rewind logic', e); }}
        />
        <IconButton
          icon="play"
          className={styles.play}
          onClick={(e) => { console.log('Implement play logic', e); }}
        />
        <IconButton
          icon="fast-forward"
          className={styles.fastForward}
          onClick={(e) => { console.log('Implement fast-forward logic', e); }}
        />
      </section>
    </section>
  );
}

export default Player;
