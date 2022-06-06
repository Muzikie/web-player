import React from 'react';
import { Link } from 'wouter';
import { useActiveRoute } from '../../../hooks';
import Icon from '../Icon';
import styles from './link.css';

interface IconLinkProps {
  icon: string;
  href: string;
  className: string;
}
const IconLink = ({
  icon,
  href,
  className = '',
}: IconLinkProps) => {
  const isActive = useActiveRoute(href);

  return (
    <Link href={href}>
      <div className={`${styles.iconLink} ${isActive ? 'active' : ''} ${className}`}>
        <Icon name={icon} />
      </div>
    </Link>
  );
}

export default IconLink;
