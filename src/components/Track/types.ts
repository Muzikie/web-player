export interface TrackType {
  name: string;
  id: string;
  image: string;
  albumId: string;
  albumName: string;
  duration: string;
  artistId: string;
  artistName: string;
  likes: string;
}

export interface TrackRowProps {
  data: TrackType;
  theme?: string;
  className?: string;
}

export interface TrackListProps {
  data: TrackType[],
  title?: string;
  className?: string;
}

export type TrackThumbnailType = Pick<TrackType, 'id'|'name'|'artistId'|'artistName'|'image'>

export interface TrackThumbnailProps {
  data: TrackThumbnailType;
  className?: string;
}
