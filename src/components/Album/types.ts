export interface AlbumType {
  name: string;
  image: string;
  id: string;
  artistName: string;
  artistId: string;
  releaseDate: number;
  ownerId: string;
  description: string;
}

export interface AlbumProps {
  data: AlbumType
}

export interface AlbumSummaryProps {
  data: AlbumType;
}

export type AlbumThumbnailType = Pick<AlbumType, 'id'|'name'|'artistId'|'artistName'|'image'>

export interface AlbumThumbnailProps {
  data: AlbumThumbnailType;
  className?: string;
}

export type AlbumRowType = Pick<AlbumType, 'id'|'name'|'artistId'|'artistName'|'image'>

export interface AlbumRowProps {
  data: AlbumRowType;
  className?: string;
  theme?: string;
}

