import React from 'react';
import { Entity, EntityRowProps } from '../types';

const ReleaseYear = ({ data }: EntityRowProps<Entity>) => {
  if (!('collectionType' in data)) return null;

  return (
    <span>
      {data.releaseYear}
      <strong>.</strong>
    </span>
  );
};

export default ReleaseYear;
