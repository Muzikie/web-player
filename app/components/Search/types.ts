import { SearchResultType } from '~/models/entity.client';

export interface SearchInputProps {
  query: string;
  setQuery: (query: string) => void;
}

export interface SearchResultProps {
  query: string;
  results: SearchResultType;
}
