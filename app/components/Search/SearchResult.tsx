/* External dependencies */
import React from 'react';

/* Internal dependencies */
import { Entity } from '~/components/Entity/types';
import List from '../List';
import { liskThemes } from '../List/types';
import { SearchResultProps } from './types';
import EmptyState from '../common/EmptyState';

const SearchResult = ({ results, query }: SearchResultProps) => {
  const isResultEmpty = Object.values(results).every(list => list.length === 0);
  return (
    <section className="results">
      {
        !isResultEmpty &&
        Object.entries(results)
          .filter(([, items]) => items.length)
          .map(([key, items]) => (
            <List
              title={key}
              key={key}
              theme={liskThemes.wide}
              items={items as Entity[]}
            />
          ))
      }
      {
        (isResultEmpty && !query) &&
        <EmptyState
          title="Discover new music, podcasts, and audio books"
          subtitle="Search for artists, songs, podcasts, albums or audio books."
        />
      }
      {
        (isResultEmpty && query) &&
        <EmptyState
          title="No results found"
          subtitle="Try searching for something else."
        />
      }
    </section>
  );
};

export default SearchResult;
