import { ChangeEventHandler } from 'react';
import { UseFormRegister } from 'react-hook-form';

type InputTheme = 'text'|'number'|'password'|'email';

interface BaseInput {
  className?: string;
  icon?: string;
  name?: string;
  register?: UseFormRegister<any>;
  registerConfig?: Record<string, unknown>;
  placeholder?: string;
  maxLength? : number;
}

export interface InputProps extends BaseInput {
  type: InputTheme;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  message?: string;
}

export interface FileInputProps extends BaseInput {
  onChange?: ChangeEventHandler<HTMLInputElement>;
  accept?: string;
  multiple?: boolean;
}

export interface TextareaProps extends BaseInput {
  onChange?: ChangeEventHandler<HTMLTextAreaElement>;
  message?: string;
}
