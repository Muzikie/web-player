import type {
  CollectionType,
  ArtistType,
  AudioType,
  PlaylistType,
  Entity,
} from '~/components/Entity/types';
import { API_URLS } from '~/constants/api';

export type SearchResultType = {
  [key: string]: Entity[];
}

const get = (url: string) => fetch(url).then((res) => res.json()).then(res => res.data);

export async function getCollections(): Promise<Array<CollectionType>> {
  return get(`${API_URLS.STREAMER}/api/v1/collections`).then(res => res);
}

export async function getCollection(id: number): Promise<CollectionType> {
  return get(`${API_URLS.STREAMER}/api/v1/collections/${id}`).then(res => res[0]);
}

export async function getCollectionAudios(id: number): Promise<Array<AudioType>> {
  return get(`${API_URLS.STREAMER}/api/v1/collections/${id}/audios`);
}

export async function getAudios(): Promise<Array<AudioType>> {
  return get(`${API_URLS.STREAMER}/api/v1/audios`);
}

export async function getArtists(): Promise<Array<ArtistType>> {
  return get(`${API_URLS.STREAMER}/api/v1/users`);
}

export async function getArtist(id: number): Promise<ArtistType> {
  return get(`${API_URLS.STREAMER}/api/v1/users/${id}`).then(res => res[0]);
}

export async function getArtistCollections(id: number): Promise<Array<CollectionType>> {
  return get(`${API_URLS.STREAMER}/api/v1/users/${id}/collections`);
}

export async function getArtistAudios(id: number): Promise<Array<AudioType>> {
  return get(`${API_URLS.STREAMER}/api/v1/users/${id}/audios`);
}

export async function getRecentlyPlayed(): Promise<Array<Entity>> {
  return get(`${API_URLS.STREAMER}/api/v1/audios?limit=6`);
}

export async function getPlaylists(): Promise<Array<PlaylistType>> {
  return get(`${API_URLS.STREAMER}/api/v1/playlists`);
}

export async function getPlaylist(id: number): Promise<PlaylistType> {
  return get(`${API_URLS.STREAMER}/api/v1/playlists/${id}`);
}

export async function getPlaylistAudios(id: number): Promise<Array<AudioType>> {
  return get(`${API_URLS.STREAMER}/api/v1/playlists/${id}/audios`);
}

export async function search(query: string): Promise<Array<SearchResultType>> {
  return get(`${API_URLS.STREAMER}/api/v1/search/${query}`);
}

export async function getUserCollections(address: string): Promise<Array<CollectionType>> {
  return get(`${API_URLS.STREAMER}/api/v1/users/${address}/collections`);
}

export async function getUserAudios(address: string): Promise<Array<AudioType>> {
  return get(`${API_URLS.STREAMER}/api/v1/users/${address}/audios`);
}
