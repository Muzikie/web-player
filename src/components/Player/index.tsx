import React from 'react';
import Icon from '../common/Icon';
import styles from './player.css';
import img from '../../assets/images/mocks/album9.png';

const Player = () => {
  return (
    <section className={styles.player}>
      <section className={styles.playingMusic}>
        <figure>
          <img src={img} alt="Love the Way You Lie" />
        </figure>
        <header>
          <h5>Love the Way You Lie</h5>
          <small>Rihanna</small>
        </header>
      </section>
      <section className={styles.controls}>
        <button><Icon name="fast-backward" /></button>
        <button><Icon name="play" /></button>
        <button><Icon name="fast-forward" /></button>
      </section>
      <section className={styles.seek}>
        <span className={styles.bar}></span>
        <time><small>1:43</small></time>
      </section>
    </section>
  );
}

export default Player;
