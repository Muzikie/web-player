import React from 'react';
import { Link } from 'wouter';
import { useActiveRoute } from '../../../hooks';
import Icon from '../Icon';
import { IconLinkProps, BaseProps } from './type';
import styles from './link.css';

const IconLink = ({
  icon,
  href,
  title,
  className = '',
  onClick,
}: IconLinkProps) => {
  const isActive = useActiveRoute(href);
  const props: any = { href };

  if (typeof onClick === 'function') {
    props.onClick = onClick;
  }

  return (
    <Link {...props}>
      <div className={`${styles.iconLink} ${isActive ? 'active' : ''} ${className}`}>
        <Icon name={icon} />
        {
          title ? <span>{title}</span> : null
        }
      </div>
    </Link>
  );
}

export default IconLink;
