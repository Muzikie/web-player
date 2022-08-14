import React from 'react';
import Collection from '../../components/Collection';
import Icon from '../../components/common/Icon';
import Logo from '../../components/Logo';
import { entityThemes } from '../../components/Entity/types';
import styles from './search.css';

import data from '@mock/search-result.json';

const Search = () => {
  return (
    <section className={styles.wrapper}>
      <header className={styles.header}>
        <Logo size="large" />
      </header>
      <section className={styles.input}>
        <Icon name="search" />
        <input
          type="text"
          onChange={(e) => { console.log('Implement search functionality', e); }}
        />
      </section>
      <section className={styles.results}>
        {
          Object.keys(data).map((key) => (
            <Collection
              title={key}
              key={key}
              itemTheme={entityThemes.minimal}
              items={data[key]}
            />
          ))
        }
      </section>
    </section>
  );
};

export default Search;
