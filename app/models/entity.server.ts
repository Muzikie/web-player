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

const get = (url: string) => fetch(url).then((res) => res.json()).then(res => res.data);

export async function getAlbums(): Promise<Array<AlbumType>> {
  return get(`${API_URLS.STREAMER}/api/v1/collections`).then(res => res);
}

export async function getAlbum(id: number): Promise<AlbumType> {
  return get(`${API_URLS.STREAMER}/api/v1/collections/${id}`).then(res => res[0]);
}

export async function getAlbumTracks(id: number): Promise<Array<TrackType>> {
  return get(`${API_URLS.STREAMER}/api/v1/collections/${id}/audios`);
}

export async function getTracks(): Promise<Array<TrackType>> {
  return get(`${API_URLS.STREAMER}/api/v1/audios`);
}

export async function getArtists(): Promise<Array<ArtistType>> {
  return get(`${API_URLS.STREAMER}/api/v1/users`);
}

export async function getArtist(id: number): Promise<ArtistType> {
  return get(`${API_URLS.STREAMER}/api/v1/users/${id}`).then(res => res[0]);
}

export async function getArtistAlbums(id: number): Promise<Array<AlbumType>> {
  return get(`${API_URLS.STREAMER}/api/v1/users/${id}/collections`);
}

export async function getArtistTracks(id: number): Promise<Array<TrackType>> {
  return get(`${API_URLS.STREAMER}/api/v1/users/${id}/audios`);
}

export async function getRecentlyPlayed(): Promise<Array<Entity>> {
  return get(`${API_URLS.STREAMER}/api/v1/audios`);
}

export async function getPlaylists(): Promise<Array<PlaylistType>> {
  return get(`${API_URLS.STREAMER}/api/v1/playlists`);
}

export async function getPlaylist(id: number): Promise<PlaylistType> {
  return get(`${API_URLS.STREAMER}/api/v1/playlists/${id}`);
}

export async function getPlaylistTracks(id: number): Promise<Array<TrackType>> {
  return get(`${API_URLS.STREAMER}/api/v1/playlists/${id}/tracks`);
}

export async function search(query: string): Promise<Array<SearchResultType>> {
  return get(`${API_URLS.STREAMER}/api/v1/search/${query}`);
}

export async function getUserAlbums(address: string): Promise<Array<AlbumType>> {
  return get(`${API_URLS.STREAMER}/api/v1/users/${address}/collections`);
}

export async function getUserTracks(address: string): Promise<Array<TrackType>> {
  return get(`${API_URLS.STREAMER}/api/v1/users/${address}/audios`);
}
