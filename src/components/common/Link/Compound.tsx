import React, { ReactElement } from 'react';
import { Link } from 'wouter';
import { useActiveRoute } from '../../../hooks';
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
}: CompoundLinkProps) => {
  const isActive = useActiveRoute(href);
  return (
    <Link href={href}>
      <div className={`${styles.compoundLink} ${isActive ? 'active' : ''} ${className}`}>
        <Icon name={icon} />
        {
          typeof children === 'string'
            ? <span>{children}</span>
            : children
        }
      </div>
    </Link>
  );
};

export default CompoundLink;
