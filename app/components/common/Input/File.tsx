/* External dependencies */
import React, { forwardRef, useState, ChangeEvent } from 'react';

/* Internal dependencies */
import Icon from '../Icon';
import { FileInputProps } from './types';

const FileInput = ({
  placeholder,
  accept,
  multiple = true,
  className = '',
  icon = 'file',
  onChange,
  ...restProps
}: FileInputProps, ref) => {
  console.log(restProps);
  const [fileName, setFileName] = useState('');

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFileName(e.target.files && e.target.files.length ? e.target.files[0].name : '');
    if (typeof onChange === 'function') {
      onChange(e);
    }
  };

  return (
    <label className={`component fileInput ${className}`}>
      {
        icon && (
          <Icon name={fileName ? 'check' : icon} />
        )
      }
      <input
        type="file"
        accept={accept}
        multiple={multiple}
        onChange={handleFileChange}
        {...restProps}
        ref={ref}
      />
      <span>{fileName || `${placeholder} (${accept})`}</span>
    </label>
  );
}
export default forwardRef(FileInput);
