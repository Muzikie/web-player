import React, { forwardRef } from 'react';

import { SelectProps } from './types';

const Select = <T extends string | number,>({
  options,
  placeholder,
  className,
  ...restProps
}: SelectProps<T>, ref) => (
    <section className={`component select ${className} ${restProps.name  ? '' : 'notSelected'}`}>
      <select {...restProps} ref={ref}>
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

export default forwardRef(Select);
