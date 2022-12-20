import { ChangeEvent } from 'react';

export interface SelectProps {
  options: Array<string|{ value: string; label: string }>;
  placeholder?: string;
  name: string;
  value: string;
  onChange: (value: ChangeEvent<HTMLSelectElement>) => void;
}
