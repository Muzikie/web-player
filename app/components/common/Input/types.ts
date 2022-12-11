import { ChangeEventHandler } from 'react';

type InputTheme = 'text'|'number'|'password'|'email';

export interface InputProps {
  type: InputTheme;
  value: string;
  onChange: ChangeEventHandler<HTMLInputElement>;
  placeholder?: string;
  className?: string;
  icon?: string;
  message?: string;
  name?: string;
}
