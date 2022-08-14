import React from 'react';
import { Link } from 'wouter';
import { useActiveRoute } from '../../../hooks';
import Icon from '../Icon';
import { CompoundLinkProps, BaseProps } from './type';
import styles from './link.css';

const CompoundLink = ({
  icon,
  children,
  href,
  className = '',
  onClick,
}: CompoundLinkProps) => {
  const isActive = useActiveRoute(href);
  const props: any = { href };

  if (typeof onClick === 'function') {
    props.onClick = onClick;
  }

  return (
    <Link {...props}>
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
