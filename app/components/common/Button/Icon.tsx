

import React from 'react';
import { IconButtonProps } from './type';
import Icon from '~/components/common/Icon';

const IconButton = ({
  onClick,
  className,
  icon,
  theme = '',
  disabled = false,
}: IconButtonProps) => (
  <button
    className={`component iconButton ${theme} ${className}`}
    onClick={onClick}
    disabled={disabled}
    type="button"
  >
    <Icon name={icon}/>
  </button>
);

export default IconButton;
