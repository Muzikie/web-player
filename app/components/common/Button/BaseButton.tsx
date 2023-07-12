import React, { MouseEvent } from 'react';
import { ButtonType } from './type';

const BaseButton = ({
  children,
  onClick,
  className,
  theme = '',
  type = 'button',
  disabled = false,
}: ButtonType) => {
  const clickFn = (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    if (typeof onClick === 'function') {
      onClick(e);
    }
  };

  return (
    <button
      className={`component ${theme} ${disabled ? 'disabled' : ''} ${className}`}
      disabled={disabled}
      type={type}
      onClick={clickFn}
    >
      { children }
    </button>
  );
};

export default BaseButton;
