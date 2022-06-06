import React, { ReactElement } from 'react';
import { Link } from 'wouter';
import Icon from '../Icon';
import styles from './link.css';

interface CompoundLinkProps {
  icon: string;
  children: string|ReactElement;
  href: string;
  className: string;
}

const CompoundLink = ({
  icon,
  children,
  href,
  className = '',
}: CompoundLinkProps) => (
  <Link className={`${styles.compoundLink} ${className}`} href={href}>
    <Icon name={icon} />
    {
      typeof children === 'string'
        ? <span>{children}</span>
        : children
    }
  </Link>
);

export default CompoundLink;
