/* External dependencies */
import React, { useState, ChangeEvent } from 'react';
import { json } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';

/* Internal dependencies */
import { SearchLoaderData } from '../../types';
import {
  search,
} from '~/models/entity.server';
import Collection from '~/components/Collection';
import { Input } from '~/components/common/Input';
import { Entity, entityThemes } from '~/components/Entity/types';
import styles from '~/styles/routes/__main/search.css';

export function links() {
  return [{ rel: 'stylesheet', href: styles }];
}

export const loader = async () => {
  return json<SearchLoaderData>({
    result: await search('query'),
  });
};

const Search = () => {
  const [_query, setQuery] = useState('');

  // @todo implement debounce
  const { result } = useLoaderData() as SearchLoaderData;

  return (
    <section className="screen search">
      <section className="inputHeader">
        <Input
          type="text"
          value={query}
          icon="search"
          placeholder="Search"
          onChange={(e: ChangeEvent<HTMLInputElement>) => setQuery(e.target.value)}
        />
      </section>
      <section className="results">
        {
          result ? Object.entries(result).map(([key, items]) => (
            <Collection
              title={key}
              key={key}
              itemTheme={entityThemes.minimal}
              items={items as Entity[]}
            />
          )) : null
        }
      </section>
    </section>
  );
};

export default Search;
