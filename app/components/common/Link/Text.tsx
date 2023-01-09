import React from 'react';
import { Link } from '@remix-run/react';
import { useActiveRoute } from '~/hooks/useActiveRoute/useActiveRoute';
import { TextLinkProps } from './type';

const TextLink = ({ title, theme, to, onClick, className = '' }: TextLinkProps) => {
  const isActive = useActiveRoute(to);
  const props: Omit<TextLinkProps, 'title' | 'onClick'> = {
    className: `component link text ${isActive ? 'active' : ''} ${className}`,
    to,
  };

  return (
    <Link {...props}>
      <span onClick={onClick} className={`${className} ${theme}`}>
        {title}
      </span>
    </Link>
  );
};

export default TextLink;
