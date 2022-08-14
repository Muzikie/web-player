import { MouseEvent, ReactElement } from 'react';

export interface BaseProps {
  href: string;
  onClick?: (event: MouseEvent<HTMLButtonElement>) => void;
  className?: string;
}

export interface IconLinkProps extends BaseProps {
  title?: string;
  icon: string;
  children?: Element;
}

export interface CompoundLinkProps extends BaseProps {
  icon: string;
  children: string|ReactElement;
}

export interface TextLinkProps extends BaseProps {
  title: string;
}
