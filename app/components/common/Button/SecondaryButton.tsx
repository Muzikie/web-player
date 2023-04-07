import React from 'react';

import { FlexibleButtonProps } from './type';
import BaseButton from './BaseButton';

const SecondaryButton = ({
  className,
  ...restProps
}: FlexibleButtonProps) => (
  <BaseButton
    {...restProps}
    className={`secondaryButton ${className}`}
  />
);

export default SecondaryButton;
