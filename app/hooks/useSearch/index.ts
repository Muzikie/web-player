import { useState, useEffect } from 'react';

import type { SearchResultType } from '~/models/types';
import { search } from '~/models/entity.client';

export const useSearch = () => {
  const [query, setQuery] = useState('');
  const [results, setResult] = useState<SearchResultType>({
    profile: [],
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
