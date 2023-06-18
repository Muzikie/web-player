import { MouseEvent, ReactElement } from 'react';

export interface ButtonType {
  className?: string;
  disabled?: boolean;
  theme?: string;
  onClick?: (event: MouseEvent<HTMLButtonElement>) => void;
  type?: 'button' | 'submit' | 'reset';
  children?: string|ReactElement;
}

export type IconButtonProps = {
  icon: string;
  theme?: string;
} & ButtonType

export type FlexibleButtonProps = {
  children: string|ReactElement;
} & ButtonType

