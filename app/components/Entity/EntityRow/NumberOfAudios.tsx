import React from 'react';
import { Entity, EntityRowProps } from '../types';

const NumberOfAudios = ({ data }: EntityRowProps<Entity>) => {
  if (!('collectionType' in data)) return null;
  let count = 'Single';
  if (data.audios.length > 1) {
    count = data.collectionType === 1 ? `${data.audios.length} songs` : `${data.audios.length} episodes`;
  }

  return (
    <span className="component audioCount">
      <span>{count}</span>
    </span>
  );
};

export default NumberOfAudios;
