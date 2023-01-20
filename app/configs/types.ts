interface BaseEntity {
  creatorAddress: string;
  name: string;
  hash: string;
  meta: string;
}

interface LoyaltyOwner {
  address: string;
  shares: number;
  income: string;
}

export interface Collection extends BaseEntity {
  coArtists: string[];
  collectionType: number;
  audios: string[];
  releaseYear: string;
  artistName: string;
  collectionID: string;
}

export interface Artist extends BaseEntity {
  description?: string;
}

export interface Audio extends BaseEntity {
  genre: number[];
  collectionID: string;
  owners: LoyaltyOwner[];
  releaseYear: string;
  artistName: string;
  audioID: string;
  duration: number;
}

export interface Playlist extends BaseEntity {
  playlistID: string;
  owners: LoyaltyOwner[];
  releaseYear: string;
  audios: Audio[];
  description: string;
}
