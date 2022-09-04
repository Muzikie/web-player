
import React from 'react';
import { FlexibleButtonProps } from './type';

const PrimaryButton = ({
  children,
  onClick,
  className,
  disabled = false,
}: FlexibleButtonProps) => (
  <button
    className={`component primaryButton ${className}`}
    onClick={onClick}
    disabled={disabled}
  >
    { children }
  </button>
);

export default PrimaryButton;
