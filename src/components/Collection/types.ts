import { ArtistType } from '../Artist/types';
import { AlbumType } from '../Album/types';
import { TrackType } from '../Track/types';
import { PlaylistType } from '../Playlist/types';

export interface CollectionProps {
  className?: string;
  direction?: string;
  title?: string;
  itemTheme?: string;
  itemsPerColumn?: string;
  artists?: ArtistType[];
  albums?: AlbumType[];
  tracks?: TrackType[];
  playlists?: PlaylistType[];
}
