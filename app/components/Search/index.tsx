import React from 'react';

import { useSearch } from '~/hooks/useSearch';
import SearchInput from './SearchInput';
import SearchResult from './SearchResult';

const Search = () => {
  const { query, setQuery, results } = useSearch();
  return (
    <section className="component searchRoot">
      <SearchInput query={query} setQuery={setQuery} />
      <SearchResult results={results} />
    </section>
  );
};

export default Search;
