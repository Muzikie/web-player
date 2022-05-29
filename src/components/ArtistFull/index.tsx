import React from 'react';
import './artistFull.css';
import selena from '../../assets/images/mocks/selena-gomez.jpg';
import data from './data.json';

const ArtistFull = () => (
  <section className="content artist">
    <section className="description">
      <figure>
        <img src={selena} alt="Selena Gomez" />
      </figure>
      <article>
        <div>
          <pre>STATION</pre>
          <h1>{ data.name }</h1>
          <p>{ data.description }</p>
        </div>
      </article>
    </section>
  </section>
);

export default ArtistFull;
