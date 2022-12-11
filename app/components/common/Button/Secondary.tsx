
import React from 'react';
import { FlexibleButtonProps } from './type';

const SecondaryButton = ({
  children,
  onClick,
  className,
  type = 'button',
  disabled = false,
}: FlexibleButtonProps) => (
  <button
    className={`component secondaryButton ${className}`}
    onClick={onClick}
    disabled={disabled}
    type={type}
  >
    { children }
  </button>
);

export default SecondaryButton;
