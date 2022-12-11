
import React from 'react';
import { FlexibleButtonProps } from './type';

const PrimaryButton = ({
  children,
  onClick,
  className,
  theme = '',
  type = 'button',
  disabled = false,
}: FlexibleButtonProps) => (
  <button
    className={`component primaryButton ${theme} ${disabled ? 'disabled' : ''} ${className}`}
    disabled={disabled}
    type={type}
    onClick={onClick}
  >
    { children }
  </button>
);

export default PrimaryButton;
