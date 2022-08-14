interface BaseEntity {
  id: string;
  name: string;
  ownerId: string;
  image: string;
}

export enum entityThemes {
  minimal = 'minimal',
  normal = 'normal',
  large = 'large',
}

export type entityTheme = entityThemes | undefined;

export interface AlbumType extends BaseEntity {
  artistName: string;
  artistId: string;
  releaseDate: number;
  description: string;
  tracks: TrackType[];
}

export interface ArtistType extends BaseEntity {
  description?: string;
  mostPopular?: TrackType[];
  albums: string[],
}

export interface TrackType extends BaseEntity {
  albumId: string;
  albumName: string;
  duration: string;
  artistId: string;
  artistName: string;
  likes: string;
}

export interface PlaylistType extends BaseEntity {
  creationDate: number;
  tracks: TrackType[];
}

export type Entity = AlbumType | ArtistType | TrackType | PlaylistType;

export interface EntityRowProps<Entity> {
  data: Entity;
  theme?: entityTheme;
  className?: string;
}
