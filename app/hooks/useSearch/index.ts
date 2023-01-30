import { useState, useEffect } from 'react';

import { search, SearchResultType } from '~/models/entity.client';

export const useSearch = () => {
  const [query, setQuery] = useState('');
  const [results, setResult] = useState<SearchResultType>({
    artist: [],
    audio: [],
    collection: [],
  });

  useEffect(() => {
    const timer = setTimeout(async () => {
      if (query) {
        const response = await search(query);
        setResult(response);
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [query]);

  return { query, setQuery, results };
};
