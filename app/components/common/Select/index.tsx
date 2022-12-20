import React from 'react';

import { SelectProps } from './types';

export const Select = <T extends string | number,>({
  options,
  value,
  name,
  placeholder,
  onChange
}: SelectProps<T>) => (
    <section className={`component select ${value ? '' : 'notSelected'}`}>
      <select name={name} value={value} onChange={onChange}>
        {
          placeholder && <option value="">{placeholder}</option>
        }
        {options.map((option) => {
          const val = typeof option === 'string' || typeof option === 'number' ? option : option.value;
          return (
            <option key={val} value={val}>
              {typeof option === 'string' || typeof option === 'number' ? option : option.label}
            </option>
          );
        })}
      </select>
    </section>
  );
