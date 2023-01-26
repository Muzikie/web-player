/* External dependencies */
import React, { useState, ChangeEvent } from 'react';
import { json } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';

/* Internal dependencies */
import { SearchLoaderData } from '../../types';
import { search } from '~/models/entity.server';
import List from '~/components/List';
import { Input } from '~/components/common/Input';
import { Entity, entityThemes } from '~/components/Entity/types';
import styles from '~/css/routes/__main/search.css';
import Search from '~/components/Search';

export function links() {
  return [{ rel: 'stylesheet', href: styles }];
}

export const loader = async () => {
  return json<SearchLoaderData>({
    result: await search('query'),
  });
};

const SearchScreen = () => {
  const [query, setQuery] = useState('');

  // @todo implement debounce
  const { result } = useLoaderData() as SearchLoaderData;

  return (
    <section className="screen search">
      <Search />
    </section>
  );
};

export default SearchScreen;
