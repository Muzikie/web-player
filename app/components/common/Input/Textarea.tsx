import React, { useState } from 'react';

/* Internal dependencies */
import { IconButton } from '../Button';
import Icon from '../Icon';
import { TextareaProps } from './types';

const Textarea = ({
  value,
  onChange,
  placeholder,
  className = '',
  icon = '',
  message = '',
  name = '',
}: TextareaProps) => {
  const [visibility, setVisibility] = useState(false);

  const toggleVisibility = () => {
    setVisibility(!visibility);
  };

  return (
    <div className={`component textarea ${message ? 'invalid' : ''}`}>
      {
        icon
          ? (
            <Icon name={icon} className="icon" />
          )
          : null
      }
      <textarea
        value={value}
        name={name}
        onChange={onChange}
        placeholder={placeholder}
        className={`component input ${className}`}
      />
      <span className="message">{message}</span>
    </div>
  );
};

export default Textarea;
