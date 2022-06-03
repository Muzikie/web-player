import React from 'react';
import Icon from '../Icon';
import styles from './link.css';

interface IconLinkProps {
  icon: string;
  target: string;
  className: string;
}

const IconLink = ({
  icon,
  target,
  className = '',
}: IconLinkProps) => (
  <a className={`${styles.iconLink} ${className}`} href={target}>
    <Icon name={icon} />
  </a>
);

export default IconLink;
