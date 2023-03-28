/* External dependencies */
import React from 'react';
import { redirect } from '@remix-run/node';
import { getSession } from '~/hooks/useSession';

/* Internal dependencies */
import styles from '~/css/routes/__main/search.css';
import Search from '~/components/Search';

export function links() {
  return [{ rel: 'stylesheet', href: styles }];
}

export const loader = async ({ request }: any) => {
  const session = await getSession(
    request.headers.get('Cookie')
  );
  const agreement = session.get('agreement');
  const address = session.get('address');
  if (!agreement && address) {
    // redirect users to agreement page when the agreement cookie is not set
    return redirect('/agreement')
  }
  return session;
}

const SearchScreen = () => (
  <section className="screen search">
    <Search />
  </section>
);

export default SearchScreen;
