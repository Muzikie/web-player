import React from 'react';
// import { IconButton } from '~/components/common/Button';
import { Collection } from '~/configs';
import { EntityRowProps } from '../types';

const CollectionActions = ({ data }: EntityRowProps<Collection>) => {
  console.log(data);
  return (
    <footer className="component entity action collection">
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
};

export default CollectionActions;
