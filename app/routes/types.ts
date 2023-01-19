import { ChangeEvent } from 'react';
import { SearchResultType } from '~/models/entity.server';
import { CollectionType, AudioType, ArtistType, PlaylistType, Entity } from '~/components/Entity/types';
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
  collection: Awaited<CollectionType>;
  audios: Awaited<AudioType[]>;
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
  artists: Awaited<ArtistType[]>;
  collections: Awaited<CollectionType[]>;
}

export interface LoaderBaseProps {
  request: Request;
}

export interface PlaylistLoaderData {
  playlist: Awaited<PlaylistType>;
  audios: Awaited<AudioType[]>;
  id: number;
}

export interface playlistLoaderParams {
  params: {
    id: number;
  };
  request: Request;
}

export interface ArtistLoaderData {
  artist: Awaited<ArtistType>;
  collections: Awaited<CollectionType[]>;
  audios: Awaited<AudioType[]>;
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
  collections: Awaited<CollectionType[]>;
  audios: Awaited<AudioType[]>;
}

export interface DiscographyProps {
  audios: AudioType[];
  collections: CollectionType[];
}
