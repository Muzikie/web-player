import {
  Collection,
  Profile,
  Audio,
  Playlist,
} from '~/configs';

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

export type Entity = Collection | Profile | Audio | Playlist;

export interface EntityRowProps<Entity> {
  data: Entity;
  theme?: entityTheme;
  mode?: entityMode;
  className?: string;
}
