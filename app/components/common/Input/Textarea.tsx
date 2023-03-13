import React from 'react';

/* Internal dependencies */
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

  return (
    <div className="component textarea">
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
