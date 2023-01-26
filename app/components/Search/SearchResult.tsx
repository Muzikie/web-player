import React from 'react';

import { entityThemes, Entity } from '~/components/Entity/types';
import List from '../List';
import { liskThemes } from '../List/types';
import { SearchResultProps } from './types';

const SearchResult = ({ results }: SearchResultProps) => {
  return (
    <section className="results">
      {Object.entries(results)
        .filter(([, items]) => items.length)
        .map(([key, items]) => (
          <List
            title={key}
            key={key}
            theme={liskThemes.wide}
            itemTheme={entityThemes.minimal}
            items={items as Entity[]}
          />
        ))}
    </section>
  );
};

export default SearchResult;
