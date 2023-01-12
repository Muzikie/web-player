interface BaseEntity {
  creatorAddress: string;
  name: string;
  hash: string;
  meta: string;
}

export enum entityThemes {
  minimal = 'minimal',
  normal = 'normal',
  large = 'large',
}

export enum entityMode {
  edit = 'edit',
  view = 'view',
}

export type entityTheme = entityThemes | undefined;

export interface AlbumType extends BaseEntity {
  coArtists: string[];
  collectionType: number;
  audios: string[];
  releaseYear: string;
  artistName: string;
  collectionID: string;
}

export interface ArtistType extends BaseEntity {
  description?: string;
}

interface LoyaltyOwnerJSON {
  address: string;
  shares: number;
  income: string;
}

export interface TrackType extends BaseEntity {
  genre: number[];
  collectionID: string;
  owners: LoyaltyOwnerJSON[];
  releaseYear: string;
  artistName: string;
  audioID: string;
}

export interface PlaylistType extends BaseEntity {
  playlistID: string;
  owners: LoyaltyOwnerJSON[];
  releaseYear: string;
  tracks: TrackType[];
  description: string;
}

export type Entity = AlbumType | ArtistType | TrackType | PlaylistType;

export interface EntityRowProps<Entity> {
  data: Entity;
  theme?: entityTheme;
  mode?: entityMode;
  className?: string;
}
