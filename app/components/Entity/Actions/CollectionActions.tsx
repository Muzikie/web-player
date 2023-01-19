import React from 'react';
// import { IconButton } from '~/components/common/Button';
import { CollectionType, EntityRowProps } from '../types';

const CollectionActions = ({ data }: EntityRowProps<CollectionType>) => (
  <footer className="component entity action collection">
    <span>{data.releaseYear}</span>
    {/* <IconButton
      icon="heart"
      className="likeButton"
      onClick={() => console.log('Implement like functionality', data)}
    />
    <IconButton
      icon="more-vertical"
      className="contextMenu"
      onClick={() => console.log('Implement context menu functionality', data)}
    /> */}
  </footer>
);

export default CollectionActions;
