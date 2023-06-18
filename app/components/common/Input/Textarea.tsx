import React from 'react';
import { UseFormRegister } from 'react-hook-form';

/* Internal dependencies */
import Icon from '../Icon';
import { TextareaProps } from './types';

const Textarea = ({
  register,
  placeholder,
  className = '',
  icon = '',
  message = '',
  name = '',
}: TextareaProps& { register: UseFormRegister<any> }) => {

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
        {...register(name)}
        name={name}
        placeholder={placeholder}
        className={`component input ${className}`}
      />
      <span className="message">{message}</span>
    </div>
  );
};

export default Textarea;
