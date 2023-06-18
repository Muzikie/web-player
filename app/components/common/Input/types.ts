import { ChangeEventHandler } from 'react';
import { UseFormRegister } from 'react-hook-form';

type InputTheme = 'text'|'number'|'password'|'email';

export interface InputProps {
  type: InputTheme;
  register?: UseFormRegister<any>;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  className?: string;
  icon?: string;
  message?: string;
  name?: string;
}

export interface FileInputProps {
  onChange?: ChangeEventHandler<HTMLInputElement>;
  title: string;
  className?: string;
  icon?: string;
  name?: string;
  accept?: string;
  multiple?: boolean;
  value?: FileList | null;
}

export interface TextareaProps {
  value?: string;
  onChange?: ChangeEventHandler<HTMLInputElement>;
  placeholder?: string;
  className?: string;
  icon?: string;
  message?: string;
  name?: string;
}
