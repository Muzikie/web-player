import React from 'react';
import { Entity, EntityRowProps } from '../types';
import ArtistActions from './ArtistActions';
import AlbumActions from './AlbumActions';
import PlaylistActions from './PlaylistActions';
import TrackActions from './TrackActions';

const Actions = ({ data }: EntityRowProps<Entity>) => {
  if ('albums' in data) {
    return <ArtistActions data={data} />;
  }
  if ('creationDate' in data) {
    return <PlaylistActions data={data} />;
  }
  if ('duration' in data) {
    return <TrackActions data={data} />;
  }
  return <AlbumActions data={data} />;
};

export default Actions;
