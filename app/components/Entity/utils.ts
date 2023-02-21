import { Entity } from './types';

export const getEntity = (data: Entity) => {
  if ('audioID' in data) {
    return 'audio';
  }
  if ('playlistID' in data) {
    return 'playlist';
  }
  if ('collectionID' in data) {
    return 'collection';
  }
  return 'profile';
};

export const getID = (data: Entity) => {
  if ('audioID' in data) {
    return data.audioID;
  }
  if ('playlistID' in data) {
    return data.playlistID;
  }
  if ('collectionID' in data) {
    return data.collectionID;
  }
  return data.creatorAddress;
};
