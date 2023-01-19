import React, { MouseEvent } from 'react';
import { Link } from '@remix-run/react';

import { useActiveRoute } from '~/hooks/useActiveRoute/useActiveRoute';
import { BaseLinkProps } from './type';

const BaseLink = ({
  to,
  className,
  onClick,
  children,
}: BaseLinkProps) => {
  const isActive = useActiveRoute(to);
  const props: any = {
    to,
    onClick: (e: MouseEvent<HTMLButtonElement>) => {
      e.stopPropagation();
      // e.preventDefault();
      if (typeof onClick === 'function') {
        onClick(e);
      }
    }
  };

  return (
    <Link {...props} className={`component link ${isActive ? 'active' : ''} ${className}`}>
      {children}
    </Link>
  );
}

export default BaseLink;
