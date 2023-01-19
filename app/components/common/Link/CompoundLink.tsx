import React, { ReactNode, ReactElement } from 'react';

import Icon from '~/components/common/Icon';
import { CompoundLinkProps } from './type';
import BaseLink from './BaseLink';

const Title = ({ children }: { children: ReactNode }): ReactElement => {
  if (typeof children == 'string') {
    return <span>{children}</span>;
  }
  return children as ReactElement;
};

const CompoundLink = ({
  icon,
  children,
  className = '',
  ...restProps
}: CompoundLinkProps) => (
  <BaseLink
    {...restProps}
    className={`compound ${className}`}
  >
    <>
      {
        icon
          ? <Icon name={icon} />
          : null
      }
      {
        children
          ? <Title>{children}</Title>
          : null
      }
    </>
  </BaseLink>
);

export default CompoundLink;
