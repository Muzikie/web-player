import { MouseEvent, ReactNode } from 'react';

export interface BaseLinkProps {
  to: string;
  onClick?: (event: MouseEvent<HTMLButtonElement>) => void;
  className?: string;
  children?: ReactNode;
  theme?: 'dark' | 'light';
}

export interface CompoundLinkProps extends BaseLinkProps {
  icon?: string;
}

