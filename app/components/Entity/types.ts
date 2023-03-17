import {
  Collection,
  Profile,
  Audio,
  Playlist,
} from '~/configs';

export enum entityThemes {
  ProfilePage = 'ProfilePage',
  CollectionPage = 'CollectionPage',
  HomePage= 'HomePage',
}

export enum entityMode {
  edit = 'edit',
  view = 'view',
}

export type entityTheme = entityThemes | undefined;

export type Entity = Collection | Profile | Audio | Playlist;

export interface EntityRowProps<Entity> {
  data: Entity;
  theme?: entityTheme;
  mode?: entityMode;
  className?: string;
  rowNumber?:number;
  showRowNumber?: boolean;
}
