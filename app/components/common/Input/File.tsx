/* External dependencies */
import React from 'react';
import { UseFormRegister } from 'react-hook-form'

/* Internal dependencies */
import Icon from '../Icon';
import { FileInputProps } from './types';

const FileInput = ({
  title,
  name = '',
  accept,
  register,
  multiple = true,
  className = '',
  icon = 'file',
}: FileInputProps & { register: UseFormRegister<any> }) => (
  <label className={`component fileInput ${className}`}>
    {
      icon && (
        <Icon name={{...register(name)} ? 'check' : icon} />
      )
    }
    <input
      type="file"
      accept={accept}
      multiple={multiple}
      {...register(name)}
    />
    <span>{title}</span>
  </label>
);

export default FileInput;
