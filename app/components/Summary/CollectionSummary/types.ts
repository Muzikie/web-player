import { Collection, Artist } from '~/configs/types';

export interface CollectionSummaryProps {
  collection: Collection;
  artist: Artist;
}

export interface ArtistLinkProps {
  artist: Artist;
}
