import React from 'react';
import { Link } from 'wouter';
import { useActiveRoute } from '../../../hooks';
import { TextLinkProps, BaseProps } from './type';
import styles from './link.css';

const TextLink = ({ title, href, onClick }: TextLinkProps) => {
  const isActive = useActiveRoute(href);
  const props: any = {
    href: `${styles.textLink} ${isActive ? 'active' : ''}`,
  };

  if (typeof onClick === 'function') {
    props.onClick = onClick;
  }

  return (
    <Link {...props}>
      { title }
    </Link>
  );
};

export default TextLink;
