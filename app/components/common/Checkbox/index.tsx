
import React from 'react';
import { CheckboxProps } from './type';

export const Checkbox = ({
  className = '',
  onChange,
  checked,
  title = '',
  ...props
}: CheckboxProps) => (
  <label className={`component checkbox ${className}`}>
    <input
      type="checkbox"
      checked={checked}
      onChange={onChange}
      {...props}
    />
    <span>{title}</span>
  </label>
);
