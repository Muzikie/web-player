import { MouseEvent, ReactNode } from 'react';

export interface BaseLinkProps {
  to: string;
  onClick?: (event: MouseEvent<HTMLButtonElement>) => void;
  className?: string;
  children?: ReactNode;
  theme?: 'dark' | 'light';
  disabled?: boolean;
}

export interface CompoundLinkProps extends BaseLinkProps {
  icon?: string;
}

