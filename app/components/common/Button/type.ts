import { MouseEvent, ReactElement } from 'react';

export interface ButtonType {
  className?: string;
  disabled?: boolean;
  theme?: string;
  onClick?: (event: MouseEvent<HTMLButtonElement>) => void;
  type?: 'button' | 'submit' | 'reset';
}

export interface IconButtonProps extends ButtonType {
  icon: string;
  theme?: string;
}

export interface FlexibleButtonProps extends ButtonType {
  children: string|ReactElement;
}

