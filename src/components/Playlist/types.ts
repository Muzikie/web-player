import { TrackThumbnailType } from '../Track/types';

export interface PlaylistType {
  name: string;
  image: any;
  id: string;
  ownerId: string;
  tracks: TrackThumbnailType[];
}

export interface ArtistProps {
  data: PlaylistType
}

export interface PlaylistSummaryProps {
  data: PlaylistType;
}

export interface PlaylistRowProps {
  data: PlaylistType;
  theme?: string;
  className?: string;
}

export type PlaylistThumbnailType = Pick<PlaylistType, 'id'|'name'|'tracks'|'image'>

export interface PlaylistThumbnailProps {
  data: PlaylistThumbnailType;
  className?: string;
  theme?: string;
}


