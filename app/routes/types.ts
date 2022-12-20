import { ChangeEvent } from 'react';
import { SearchResultType } from '~/models/entity.server';
import { AlbumType, TrackType, ArtistType, PlaylistType, Entity } from '~/components/Entity/types';
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

export interface AlbumLoaderData {
  album: Awaited<AlbumType>;
  tracks: Awaited<TrackType[]>;
  id: number;
  profileInfo: ProfileInfoType;
}

export interface albumLoaderProps {
  params: {
    id: number;
  };
  request: Request;
}

export interface HomeLoaderData {
  playlists: Awaited<PlaylistType[]>;
  recentlyPlayed: Awaited<Entity[]>;
  artists: Awaited<ArtistType[]>;
  albums: Awaited<AlbumType[]>;
  profileInfo: ProfileInfoType;
}

export interface HomeLoaderProps {
  request: Request;
}

export interface LoginLoaderProps {
  request: Request;
}

export interface PlaylistLoaderData {
  playlist: Awaited<PlaylistType>;
  tracks: Awaited<TrackType[]>;
  id: number;
  profileInfo: ProfileInfoType;
}

export interface playlistLoaderParams {
  params: {
    id: number;
  };
  request: Request;
}

export interface ArtistLoaderData {
  artist: Awaited<ArtistType>;
  albums: Awaited<AlbumType[]>;
  tracks: Awaited<TrackType[]>;
  id: number;
  profileInfo: ProfileInfoType;
}

export interface artistLoaderProps {
  params: {
    id: number;
  };
  request: Request;
}

export interface ProfileLoaderProps {
  params: {
    tab: number;
  };
  request: Request;
}

export interface ProfileLoaderData {
  profileInfo: ProfileInfoType;
}

export interface UserDiscographyLoaderData {
  albums: Awaited<AlbumType[]>;
  tracks: Awaited<TrackType[]>;
}

export interface UserDiscographyProps {
  tracks: TrackType[];
  albums: AlbumType[];
}
