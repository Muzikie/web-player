import React from 'react';
import { UseFormRegister } from 'react-hook-form'

import { SelectProps } from './types';

export const Select = <T extends string | number,>({
  options,
  register,
  name,
  placeholder,
}: SelectProps<T> & { register: UseFormRegister<any> }) => (
    <section className={`component select ${register(name)  ? '' : 'notSelected'}`}>
      <select {...register(name)} >
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
