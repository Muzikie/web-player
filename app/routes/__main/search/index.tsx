/* External dependencies */
import { useState } from 'react';
import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";

/* Internal dependencies */
import {
  search,
} from "~/models/entity.server";
import Collection from '~/components/Collection';
import Icon from '~/components/common/Icon';
import Logo from '~/components/Logo';
import { Entity, entityThemes } from '~/components/Entity/types';
import styles from "~/styles/routes/__main/search.css";

export function links() {
  return [{ rel: "stylesheet", href: styles }];
}

type LoaderData = {
  result: Awaited<ReturnType<typeof search>>;
};

export const loader = async () => {
  return json<LoaderData>({
    result: await search('query'),
  });
};

const Search = () => {
  const [query, setQuery] = useState('');

  // @todo implement debounce
  const { result } = useLoaderData() as LoaderData;

  return (
    <section className="screen search">
      <header className="header">
        <Logo size="large" />
      </header>
      <section className="input">
        <Icon name="search" />
        <input
          type="text"
          onChange={(e) => setQuery(e.target.value)}
        />
      </section>
      <section className="results">
        {
          result ? Object.keys(result).map((key: string) => (
            <Collection
              title={key}
              key={key}
              itemTheme={entityThemes.minimal}
              items={result[key] as Entity[]}
            />
          )) : null
        }
      </section>
    </section>
  );
};

export default Search;
