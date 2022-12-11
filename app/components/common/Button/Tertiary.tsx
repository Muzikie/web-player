
import React from 'react';
import { FlexibleButtonProps } from './type';

const TertiaryButton = ({
  children,
  onClick,
  className,
  type = 'button',
  disabled = false,
}: FlexibleButtonProps) => (
  <button
    className={`component tertiaryButton ${className}`}
    onClick={onClick}
    disabled={disabled}
    type={type}
  >
    { children }
  </button>
);

export default TertiaryButton;
