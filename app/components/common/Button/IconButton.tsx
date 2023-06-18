import React from 'react';

import { IconButtonProps } from './type';
import BaseButton from './BaseButton';
import Icon from '~/components/common/Icon';

const IconButton = ({
  icon,
  className,
  ...restProps
}: IconButtonProps) => (
  <BaseButton
    {...restProps}
    className={`iconButton ${className}`}
  >
    <Icon name={icon}/>
  </BaseButton>
);

export default IconButton;
