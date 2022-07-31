import { MouseEvent, ReactElement } from 'react';

export interface ButtonType {
  className?: string;
  onClick: (event: MouseEvent<HTMLButtonElement>) => void;
}

export interface IconButtonProps extends ButtonType {
  icon: string;
  theme?: string;
}

export interface FlexibleButtonProps extends ButtonType {
  children: string|ReactElement;
}

