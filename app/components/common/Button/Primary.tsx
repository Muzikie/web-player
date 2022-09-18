
import React from 'react';
import { FlexibleButtonProps } from './type';

const PrimaryButton = ({
  children,
  onClick,
  className,
  theme = '',
  disabled = false,
}: FlexibleButtonProps) => (
  <button
    className={`component primaryButton ${theme} ${disabled ? 'disabled' : ''} ${className}`}
    onClick={onClick}
    disabled={disabled}
  >
    { children }
  </button>
);

export default PrimaryButton;
