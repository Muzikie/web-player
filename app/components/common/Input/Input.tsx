/* External dependencies */
import React, { useState } from 'react';


/* Internal dependencies */
import { IconButton } from '../Button';
import Icon from '../Icon';
import { InputProps } from './types';

const Input = ({
  type = 'text',
  onChange,
  register,
  placeholder,
  className = '',
  icon = '',
  message = '',
  name = '',
}: InputProps) => {
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
        type={type === 'password' && visibility ? 'text' : type}
        onChange={onChange}
        {...(register && register(name))}
        name={name}
        placeholder={placeholder}
        className={`component input ${className}`}
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

export default Input;
