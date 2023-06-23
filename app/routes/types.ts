import { SearchResultType } from '~/models/entity.server';

import {
  Collection,
  Audio,
  Profile,
  Playlist
} from '~/configs';
import { Entity } from '~/components/Entity/types';

export interface SearchLoaderData {
  result: Awaited<SearchResultType[]>;
}

export interface CollectionInfoLoaderData {
  CollectionInfo: Awaited<Collection[]>;
}

export interface CollectionLoaderData {
  collection: Awaited<Collection>;
  profile: Awaited<Profile>;
  audios: Awaited<Audio[]>;
  id: number;
}

export interface collectionLoaderProps {
  request: Request;
  params: {
    id: number;
  };
}

export interface HomeLoaderData {
  recentlyPlayed: Awaited<Entity[]>;
  profiles: Awaited<Profile[]>;
  collections: Awaited<Collection[]>;
}

export interface LoaderBaseProps {
  request: Request;
}

export interface PlaylistLoaderData {
  playlist: Awaited<Playlist>;
  audios: Awaited<Audio[]>;
  id: number;
}

export interface playlistLoaderParams {
  params: {
    id: number;
  };
}

export interface ProfileLoaderData {
  profile: Awaited<Profile>;
  collections?: Awaited<Collection[]>;
  audios?: Awaited<Audio[]>;
  id: string;
}

export interface profileLoaderProps {
  params: {
    id: string;
  };
  request: Request;
}

export interface UploadLoaderProps {
  request: Request;
}

export interface UploadLoaderData {
  id: string;
}

export interface DiscographyLoaderData {
  collections: Awaited<Collection[]>;
  audios: Awaited<Audio[]>;
}

export interface DiscographyProps {
  audios: Audio[];
  collections: Collection[];
}
