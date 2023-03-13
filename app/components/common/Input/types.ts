import { ChangeEventHandler } from 'react';
import { number } from 'yup';

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

export interface FileInputProps {
  onChange: ChangeEventHandler<HTMLInputElement>;
  title: string;
  className?: string;
  icon?: string;
  name?: string;
  accept?: string;
  multiple?: boolean;
}

export interface TextareaProps {
  value: string;
  onChange: ChangeEventHandler<HTMLInputElement>;
  placeholder?: string;
  className?: string;
  icon?: string;
  message?: string;
  name?: string;
}
