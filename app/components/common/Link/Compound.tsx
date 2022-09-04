import React from 'react';
import { Link } from '@remix-run/react';
import { useActiveRoute } from '~/hooks';
import Icon from '~/components/common/Icon';
import { CompoundLinkProps } from './type';

const CompoundLink = ({
  icon,
  children,
  to,
  className = '',
  onClick,
}: CompoundLinkProps) => {
  const isActive = useActiveRoute(to);
  const props: any = { to };

  if (typeof onClick === 'function') {
    props.onClick = onClick;
  }

  return (
    <Link {...props} className={`component link compound ${isActive ? 'active' : ''} ${className}`}>
      {/* @todo removed an anchor from here. Did it break the styles? */}
      <Icon name={icon} />
      {
        typeof children === 'string'
          ? <span>{children}</span>
          : children
      }
    </Link>
  );
};

export default CompoundLink;
