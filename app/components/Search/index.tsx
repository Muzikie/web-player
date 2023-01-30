/* External dependencies */
import React from 'react';

/* Internal dependencies */
import { useSearch } from '~/hooks/useSearch';
import SearchInput from './SearchInput';
import SearchResult from './SearchResult';

const Search = () => {
  const { query, setQuery, results } = useSearch();
  return (
    <section className="component searchRoot">
      <SearchInput query={query} setQuery={setQuery} />
      <SearchResult query={query} results={results} />
    </section>
  );
};

export default Search;
