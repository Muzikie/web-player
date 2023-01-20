import React from 'react';
import { IconButton } from '~/components/common/Button';
import { Artist } from '~/configs';
import { EntityRowProps } from '../types';

const ArtistActions = ({ data }: EntityRowProps<Artist>) => (
  <footer className="component entity action artist">
    <IconButton
      icon="heart"
      className="likeButton"
      onClick={() => console.log('Implement like functionality', data)}
    />
    <IconButton
      icon="more-vertical"
      className="contextMenu"
      onClick={() => console.log('Implement context menu functionality', data)}
    />
  </footer>
);

export default ArtistActions;
