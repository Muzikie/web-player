import React from 'react';
// import { IconButton } from '~/components/common/Button';
import { Collection } from '~/configs/types';
import { EntityRowProps } from '../types';

const CollectionActions = ({ data }: EntityRowProps<Collection>) => (
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
