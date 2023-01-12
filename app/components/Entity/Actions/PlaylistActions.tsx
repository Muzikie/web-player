import React from 'react';
// import { IconButton } from '~/components/common/Button';
import { PlaylistType, EntityRowProps } from '../types';

const PlaylistActions = ({ data }: EntityRowProps<PlaylistType>) => (
  <footer className="component entity action playlist">
    <span>{`${data.description} tracks`}</span>
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

export default PlaylistActions;
