import React from 'react';
import { Link } from '@remix-run/react';
import { useActiveRoute } from '~/hooks';
import { TextLinkProps } from './type';

const TextLink = ({ title, to, onClick, className = '' }: TextLinkProps) => {
  const isActive = useActiveRoute(to);
  const props: Omit<TextLinkProps, 'title'|'onClick'> = {
    className: `component link text ${isActive ? 'active' : ''} ${className}`,
    to,
  };

  return (
    <Link {...props}>
      <span onClick={onClick}>
        { title }
      </span>
    </Link>
  );
};

export default TextLink;
