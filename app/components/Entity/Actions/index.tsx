import React from 'react';
import { Entity, entityMode, EntityRowProps } from '../types';
import ProfileActions from './ProfileActions';
import CollectionActions from './CollectionActions';
import PlaylistActions from './PlaylistActions';
import AudioActions from './AudioActions';
import EditActions from './EditActions';

const Actions = ({ data, mode }: EntityRowProps<Entity>) => {
  if (mode === entityMode.edit) {
    return <EditActions data={data} />;
  }
  if ('audioID' in data) {
    return <AudioActions data={data} />;
  }
  if ('collectionID' in data) {
    return <CollectionActions data={data} />;
  }
  if ('playlistID' in data) {
    return <PlaylistActions data={data} />;
  }
  return <ProfileActions data={data} />;
};

export default Actions;
