
import React from 'react';
import { FlexibleButtonProps } from './type';

const TertiaryButton = ({
  children,
  onClick,
  className,
  disabled = false,
}: FlexibleButtonProps) => (
  <button
    className={`component tertiaryButton ${className}`}
    onClick={onClick}
    disabled={disabled}
  >
    { children }
  </button>
);

export default TertiaryButton;
