import { ChangeEvent } from 'react';
import { SearchResultType } from '~/models/entity.server';

import { Collection, Audio, Artist, Playlist } from '~/configs/types';
import { Entity } from '~/components/Entity/types';
import { ProfileInfoType } from '~/context/profileContext/types';

export interface AgreementFormProps {
  terms: {
    value: boolean[];
    isValid: boolean;
  };
  handleChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

export interface AgreementInfoProps {
  disabled: boolean;
}

export interface SearchLoaderData {
  result: Awaited<SearchResultType[]>;
}

export interface CollectionLoaderData {
  collection: Awaited<Collection>;
  audios: Awaited<Audio[]>;
  id: number;
}

export interface collectionLoaderProps {
  params: {
    id: number;
  };
  request: Request;
}

export interface HomeLoaderData {
  recentlyPlayed: Awaited<Entity[]>;
  artists: Awaited<Artist[]>;
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
  request: Request;
}

export interface ArtistLoaderData {
  artist: Awaited<Artist>;
  collections: Awaited<Collection[]>;
  audios: Awaited<Audio[]>;
  id: number;
}

export interface artistLoaderProps {
  params: {
    id: number;
  };
  request: Request;
}

export interface ProfileLoaderData {
  profileInfo: Partial<ProfileInfoType>;
}

export interface DiscographyLoaderData {
  collections: Awaited<Collection[]>;
  audios: Awaited<Audio[]>;
}

export interface DiscographyProps {
  audios: Audio[];
  collections: Collection[];
}
