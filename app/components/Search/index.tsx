import React from 'react';
import { isEmpty } from '~/helpers/helpers';

import { useSearch } from '~/hooks/useSearch';
import { NotFound } from './NotFound';
import SearchInput from './SearchInput';
import SearchResult from './SearchResult';
import { SearchTips } from './SearchTips';

const Search = () => {
  const { query, setQuery, results } = useSearch();
  isEmpty(results, true);
  return (
    <section className='component searchRoot'>
      <SearchInput query={query} setQuery={setQuery} />
      {isEmpty(results, true) && !query && <SearchTips />}
      {isEmpty(results, true) && query && <NotFound />}
      {!isEmpty(results, true) && <SearchResult results={results} />}
    </section>
  );
};

export default Search;
