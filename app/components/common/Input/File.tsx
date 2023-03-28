/* External dependencies */
import React from 'react';

/* Internal dependencies */
import Icon from '../Icon';
import { FileInputProps } from './types';

const FileInput = ({
  onChange,
  title,
  name,
  accept,
  value,
  multiple = true,
  className = '',
  icon = 'file',
}: FileInputProps) => (
  <label className={`component fileInput ${className}`}>
    {
      icon && (
        <Icon name={value ? 'check' : icon} />
      )
    }
    <input
      type="file"
      name={name}
      accept={accept}
      multiple={multiple}
      onChange={onChange}
    />
    <span>{title}</span>
  </label>
);

export default FileInput;
