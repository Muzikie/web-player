import React from 'react';
import { Link } from '@remix-run/react';
import { useActiveRoute } from '~/hooks/useActiveRoute/useActiveRoute';
import Icon from '~/components/common/Icon';
import { IconLinkProps } from './type';

const IconLink = ({
  icon,
  to,
  title,
  className = '',
  onClick,
}: IconLinkProps) => {
  const isActive = useActiveRoute(to);
  const props: any = { to };

  if (typeof onClick === 'function') {
    props.onClick = onClick;
  }

  return (
    <Link {...props} className={`component link icon ${isActive ? 'active' : ''} ${className}`}>
      {/* @todo removed an anchor from here. Did it break the styles? */}
      <Icon name={icon} />
      {
        title ? <span>{title}</span> : null
      }
    </Link>
  );
}

export default IconLink;
