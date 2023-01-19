
import React from 'react';

import { FlexibleButtonProps } from './type';
import BaseButton from './BaseButton';

const TertiaryButton = ({
  className,
  ...restProps
}: FlexibleButtonProps) => (
  <BaseButton
    {...restProps}
    className={`tertiaryButton ${className}`}
  />
);

export default TertiaryButton;
