/* External dependencies */
import React, { useState, forwardRef } from 'react';

/* Internal dependencies */
import { IconButton } from '../Button';
import Icon from '../Icon';
import { InputProps } from './types';

const Input = ({
  type = 'text',
  placeholder,
  className = '',
  icon = '',
  message = '',
  ...restProps
}: InputProps, ref) => {
  const [visibility, setVisibility] = useState(false);

  const toggleVisibility = () => {
    setVisibility(!visibility);
  };

  return (
    <div className={`component input ${message ? 'invalid' : ''}`}>
      {
        icon
          ? (
            <Icon name={icon} className="icon" />
          )
          : null
      }
      <input
        placeholder={placeholder}
        className={`component input ${className}`}
        type={type === 'password' && visibility ? 'text' : type}
        {...restProps}
        ref={ref}
      />
      {
        type === 'password'
          ? (
            <IconButton
              className="visibilityButton"
              icon={visibility ? 'eye-off' : 'eye'}
              onClick={toggleVisibility}
            />
          )
          : null
      }
      <span className="message">{message}</span>
    </div>
  );
};

export default forwardRef(Input);
