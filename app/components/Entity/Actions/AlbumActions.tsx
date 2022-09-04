import React from 'react';
import { IconButton } from '~/components/common/Button';
import { getYear } from '~/helpers/formatters';
import { AlbumType, EntityRowProps } from '../types';

const AlbumActions = ({ data }: EntityRowProps<AlbumType>) => (
  <footer className="component entity action album">
    <span>{getYear(data.releaseDate)}</span>
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

export default AlbumActions;
