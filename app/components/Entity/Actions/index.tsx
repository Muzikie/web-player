import React from 'react';
import { Entity, entityMode, EntityRowProps } from '../types';
import ArtistActions from './ArtistActions';
import AlbumActions from './AlbumActions';
import PlaylistActions from './PlaylistActions';
import TrackActions from './TrackActions';
import EditActions from './EditActions';

const Actions = ({ data, mode }: EntityRowProps<Entity>) => {
  if (mode === entityMode.edit) {
    return <EditActions data={data} />;
  }
  if ('audioID' in data) {
    return <TrackActions data={data} />;
  }
  if ('collectionID' in data) {
    return <AlbumActions data={data} />;
  }
  if ('playlistID' in data) {
    return <PlaylistActions data={data} />;
  }
  return <ArtistActions data={data} />;
};

export default Actions;
