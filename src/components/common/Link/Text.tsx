import React from 'react';
import { Link } from 'wouter';
import { useActiveRoute } from '../../../hooks';
import styles from './link.css';

interface TextLinkProps {
  title: string;
  href: string;
}

const TextLink = ({ title, href }: TextLinkProps) => {
  const isActive = useActiveRoute(href);
  return (
    <Link
      className={`${styles.textLink} ${isActive ? 'active' : ''}`}
      href={href}
    >
      { title }
    </Link>
  );
};

export default TextLink;
