import React from 'react';

import { SelectProps } from './types';

export const Select = ({
  options,
  value,
  name,
  placeholder,
  onChange
}: SelectProps) => (
  <section className={`component select ${value ? '' : 'notSelected'}`}>
    <select name={name} value={value} onChange={onChange}>
      {
        placeholder && <option value="">{placeholder}</option>
      }
      {options.map((option) => {
        const val = typeof option === 'string' ? option : option.value;
        return (
          <option key={val} value={val}>
            {typeof option === 'string' ? option : option.label}
          </option>
        );
      })}
    </select>
  </section>
);
