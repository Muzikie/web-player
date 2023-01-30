/* External dependencies */
import React, { ChangeEvent } from 'react';

/* Internal dependencies */
import { Input } from '../common/Input';
import { SearchInputProps } from './types';

const SearchInput = ({ query, setQuery }: SearchInputProps) => (
  <section className="inputHeader">
    <Input
      type="text"
      value={query}
      icon="search"
      placeholder="Search"
      onChange={(e: ChangeEvent<HTMLInputElement>) => setQuery(e.target.value)}
    />
  </section>
);

export default SearchInput;
