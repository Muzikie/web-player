import type {
  AlbumType,
  ArtistType,
  TrackType,
  PlaylistType,
  Entity,
} from '~/components/Entity/types';
import { API_URLS } from '~/constants/api';

export type SearchResultType = {
  [key: string]: Entity[];
}

export async function getAlbums(): Promise<Array<AlbumType>> {
  return fetch(`${API_URLS.SERVICE}/albums`).then((res) => res.json());
}

export async function getAlbum(id: number): Promise<AlbumType> {
  return fetch(`${API_URLS.SERVICE}/albums/${id}`).then((res) => res.json());
}

export async function getAlbumTracks(id: number): Promise<Array<TrackType>> {
  return fetch(`${API_URLS.SERVICE}/albums/${id}/tracks`).then((res) => res.json());
}

export async function getTracks(): Promise<Array<TrackType>> {
  return fetch(`${API_URLS.SERVICE}/tracks`).then((res) => res.json());
}

export async function getArtists(): Promise<Array<ArtistType>> {
  return fetch(`${API_URLS.SERVICE}/artists`).then((res) => res.json());
}

export async function getArtist(id: number): Promise<ArtistType> {
  return fetch(`${API_URLS.SERVICE}/artists/${id}`).then((res) => res.json());
}

export async function getArtistAlbums(id: number): Promise<Array<AlbumType>> {
  return fetch(`${API_URLS.SERVICE}/artists/${id}/albums`).then((res) => res.json());
}

export async function getArtistTracks(id: number): Promise<Array<TrackType>> {
  return fetch(`${API_URLS.SERVICE}/artists/${id}/tracks`).then((res) => res.json());
}

export async function getRecentlyPlayed(): Promise<Array<Entity>> {
  return fetch(`${API_URLS.SERVICE}/recentlyPlayed`).then((res) => res.json());
}

export async function getPlaylists(): Promise<Array<PlaylistType>> {
  return fetch(`${API_URLS.SERVICE}/playlists`).then((res) => res.json());
}

export async function getPlaylist(id: number): Promise<PlaylistType> {
  return fetch(`${API_URLS.SERVICE}/playlists/${id}`).then((res) => res.json());
}

export async function getPlaylistTracks(id: number): Promise<Array<PlaylistType>> {
  return fetch(`${API_URLS.SERVICE}/playlists/${id}/tracks`).then((res) => res.json());
}

export async function search(query: string): Promise<Array<SearchResultType>> {
  return fetch(`${API_URLS.SERVICE}/search/${query}`).then((res) => res.json());
}
