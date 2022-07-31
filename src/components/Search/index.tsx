import React from 'react';
import Icon from '../common/Icon';
import styles from './search.css';
import { TrackType } from '../Track/types';
import TrackRow from '../Track/TrackRow';

import data from '@mock/album-tracks.json';

const Search = () => (
  <section className={styles.wrapper}>
    <div className={styles.input}>
      <Icon name="search" />
      <input
        type="text"
        onChange={(e) => { console.log('Implement search functionality', e); }}
      />
    </div>
    <div className={styles.results}>
      {
        data.slice(0, 4).map((item: TrackType) => (<TrackRow key={item.id} data={item} />))
      }
    </div>
  </section>
);

export default Search;
