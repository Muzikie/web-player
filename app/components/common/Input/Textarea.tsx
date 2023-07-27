import React, { forwardRef } from 'react';

/* Internal dependencies */
import Icon from '../Icon';
import { TextareaProps } from './types';

const Textarea = ({
  onChange,
  placeholder,
  className = '',
  icon = '',
  message = '',
  name = '',
  maxLength,
}: TextareaProps, ref) => (
  <div className="component textarea">
    {
      icon
        ? (
          <Icon name={icon} className="icon" />
        )
        : null
    }
    <textarea
      name={name}
      onChange={onChange}
      placeholder={placeholder}
      className={`component input ${className}`}
      ref={ref}
      maxLength={maxLength}
    />
    <span className="message">{message}</span>
  </div>
);

export default forwardRef(Textarea);
