/* External dependencies */
import React from 'react';

/* Internal dependencies */
import styles from '~/css/routes/__main/search.css';
import Search from '~/components/Search';

export function links() {
  return [{ rel: 'stylesheet', href: styles }];
}
const SearchScreen = () => (
  <section className="screen search">
    <Search />
  </section>
);

export default SearchScreen;
