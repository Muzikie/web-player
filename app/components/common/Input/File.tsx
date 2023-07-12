/* External dependencies */
import React, { forwardRef } from 'react';

/* Internal dependencies */
import Icon from '../Icon';
import { FileInputProps } from './types';

const FileInput = ({
  placeholder,
  accept,
  multiple = true,
  className = '',
  icon = 'file',
  ...restProps
}: FileInputProps, ref) => (
  <label className={`component fileInput ${className}`}>
    {
      icon && (
        <Icon name={restProps.name ? 'check' : icon} />
      )
    }
    <input
      type="file"
      accept={accept}
      multiple={multiple}
      {...restProps}
      ref={ref}
    />
    <span>{placeholder}</span>
  </label>
);

export default forwardRef(FileInput);
