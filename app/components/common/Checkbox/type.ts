import { ChangeEvent } from 'react';

export interface CheckboxProps {
  className?: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  checked: boolean;
  title: string;
  disabled?: boolean;
  name?: string;
  value?: string;
}

