export interface ArtistType {
  name: string;
  image: any;
  description?: string;
  id: string;
  ownerId: string;
}

export interface ArtistProps {
  data: ArtistType
}

export type ArtistThumbnailType = Pick<ArtistType, 'id'|'name'|'image'>

export interface ArtistThumbnailProps {
  data: ArtistThumbnailType;
  className?: string;
  theme?: string;
}
