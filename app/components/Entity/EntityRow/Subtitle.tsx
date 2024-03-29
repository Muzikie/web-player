import React from 'react';
import { Entity, EntityRowProps } from '../types';

const Subtitle = ({ data }: EntityRowProps<Entity>) => {
  let subtitle;
  if ('playlistID' in data) {
    subtitle = data.description;
  } else if ('collectionID' in data) {
    // @todo add data.profile.name
    subtitle = data.name;
  } else {
    subtitle = data.name ?? '-';
  }

  return (
    <span className="component profileName">{subtitle}</span>
  );
};
export default Subtitle;
