import React from 'react';
import { SecondaryButton } from '~/components/common/Button';
import { EntityRowProps, Entity } from '../types';

const EditActions = ({ data }: EntityRowProps<Entity>) => (
  <footer className="component entity action edit">
    <SecondaryButton
      className="contextMenu"
      onClick={() => console.log('Implement context menu functionality', data)}
    >
      Edit
    </SecondaryButton>
  </footer>
);

export default EditActions;
