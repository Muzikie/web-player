import { ChangeEvent, ReactDOM } from 'react';

export interface SelectProps<T> {
  options: Array<T|{ value: T; label: string }>;
  placeholder?: string;
  name: string;
  value: T;
  onChange: (value: ChangeEvent<HTMLSelectElement>) => void;
}

export type SelectFn = <Type,>(arg: SelectProps<Type>) => ReactDOM;
