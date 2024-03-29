import React from 'react';
import { IconButton } from '~/components/common/Button';
import { Profile } from '~/configs';
import { EntityRowProps } from '../types';

const ProfileActions = ({ data }: EntityRowProps<Profile>) => (
  <footer className="component entity action profile">
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

export default ProfileActions;
