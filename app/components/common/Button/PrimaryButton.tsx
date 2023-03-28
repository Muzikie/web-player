
import React from 'react';

import { FlexibleButtonProps } from './type';
import BaseButton from './BaseButton';

const PrimaryButton = ({
  className,
  ...restProps
}: FlexibleButtonProps) => (
  <BaseButton
    {...restProps}
    className={`primaryButton ${className}`}
  />
);

export default PrimaryButton;
