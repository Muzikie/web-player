import { TrackType } from '../TrackRow';

export interface PlaylistType {
  name: string;
  image: any;
  id: string;
  ownerId: string;
  tracks: TrackType[];
}

interface ArtistProps {
  data: PlaylistType
}
