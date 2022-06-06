import React from 'react';
import { Link } from 'wouter';
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
}: IconLinkProps) => (
  <Link href={href}>
    <div className={`${styles.iconLink} ${className}`}>
      <Icon name={icon} />
    </div>
  </Link>
);

export default IconLink;
