import type {
  AlbumType,
  ArtistType,
  TrackType,
  PlaylistType,
  Entity,
} from '~/components/Entity/types';

type SearchResultType = {
  [key: string]: Entity[];
}

export async function getAlbums(): Promise<Array<AlbumType>> {
  return fetch('http://localhost:2621/albums').then((res) => res.json());
}

export async function getAlbum(id: number): Promise<AlbumType> {
  return fetch(`http://localhost:2621/albums/${id}`).then((res) => res.json());
}

export async function getAlbumTracks(id: number): Promise<Array<TrackType>> {
  return fetch(`http://localhost:2621/albums/${id}/tracks`).then((res) => res.json());
}

export async function getTracks(): Promise<Array<TrackType>> {
  return fetch('http://localhost:2621/tracks').then((res) => res.json());
}

export async function getArtists(): Promise<Array<ArtistType>> {
  return fetch('http://localhost:2621/artists').then((res) => res.json());
}

export async function getArtist(id: number): Promise<ArtistType> {
  return fetch(`http://localhost:2621/artists/${id}`).then((res) => res.json());
}

export async function getArtistAlbums(id: number): Promise<Array<AlbumType>> {
  return fetch(`http://localhost:2621/artists/${id}/albums`).then((res) => res.json());
}

export async function getArtistTracks(id: number): Promise<Array<TrackType>> {
  return fetch(`http://localhost:2621/artists/${id}/tracks`).then((res) => res.json());
}

export async function getRecentlyPlayed(): Promise<Array<Entity>> {
  return fetch('http://localhost:2621/recentlyPlayed').then((res) => res.json());
}

export async function getPlaylists(): Promise<Array<PlaylistType>> {
  return fetch('http://localhost:2621/playlists').then((res) => res.json());
}

export async function getPlaylist(id: number): Promise<PlaylistType> {
  return fetch(`http://localhost:2621/playlists/${id}`).then((res) => res.json());
}

export async function getPlaylistTracks(id: number): Promise<Array<PlaylistType>> {
  return fetch(`http://localhost:2621/playlists/${id}/tracks`).then((res) => res.json());
}

export async function search(query: string): Promise<Array<SearchResultType>> {
  return fetch(`http://localhost:2621/search/${query}`).then((res) => res.json());
}
