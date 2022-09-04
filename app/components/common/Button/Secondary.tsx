
import React from 'react';
import { FlexibleButtonProps } from './type';

const SecondaryButton = ({
  children,
  onClick,
  className,
  disabled = false,
}: FlexibleButtonProps) => (
  <button
    className={`component secondaryButton ${className}`}
    onClick={onClick}
    disabled={disabled}
  >
    { children }
  </button>
);

export default SecondaryButton;
