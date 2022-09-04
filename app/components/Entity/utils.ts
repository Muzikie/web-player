import { Entity } from './types';

export const getEntity = (data: Entity) => {
  if ('albums' in data) {
    return 'artist';
  }
  if ('creationDate' in data) {
    return 'playlist';
  }
  if ('duration' in data) {
    return 'track';
  }
  if ('releaseDate' in data) {
    return 'album';
  }
  return 'unknown';
}
