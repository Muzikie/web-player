/* External dependencies */
import React from 'react';

/* Internal dependencies */
import Icon from '../Icon';
import { FileInputProps } from './types';

const FileInput = ({
  onChange,
  title,
  className = '',
  icon = '',
}: FileInputProps) => (
  <label className={`component fileInput ${className}`}>
    {
      icon && (
        <Icon name={icon} />
      )
    }
    <input
      type="file"
      onChange={onChange}
    />
    <span>{title}</span>
  </label>
);

export default FileInput;
