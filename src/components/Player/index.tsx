import React from 'react';
import Icon from '../common/Icon';
import './player.css';
import img from '../../assets/images/mocks/album9.png';

const Player = () => {
  return (
    <section className="player">
      <section className="playingMusic">
        <figure>
          <img src={img} alt="Love the Way You Lie" />
        </figure>
        <header>
          <h5>Love the Way You Lie</h5>
          <small>Rihanna</small>
        </header>
      </section>
      <section className="controls">
        <button><Icon name="fast-backward" /></button>
        <button><Icon name="play" /></button>
        <button><Icon name="fast-forward" /></button>
      </section>
      <section className="seek">
        <span className="bar"></span>
        <time><small>1:43</small></time>
      </section>
    </section>
  );
}

export default Player;
