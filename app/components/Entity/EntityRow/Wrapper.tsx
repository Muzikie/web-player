import React from 'react';
import { memo, ReactNode, MouseEvent, useContext } from 'react';

/* Internal dependencies */
import { Link } from '~/components/common/Link';
import { PlayerContext } from '~/context/playerContext/playerContextProvider';
import { Entity, entityMode, TrackType } from '../types';
import { getID } from '../utils';

interface WrapperProps {
  entity: string;
  className: string;
  data: Entity;
  mode: entityMode;
  children: ReactNode;
}

const Wrapper = ({
  entity, data, children, className, mode,
}: WrapperProps) => {
  const { setCurrent } = useContext(PlayerContext);

  if (mode == entityMode.edit) {
    return (
      <section className={className}>{children}</section>
    );
  }

  if (entity === 'track') {
    const play = (e: MouseEvent) => {
      e.preventDefault();
      if (setCurrent) {
        setCurrent(data as TrackType);
      }
    };

    return (
      <section
        onClick={play}
        className={className}
      >
        {children}
      </section>
    );
  }

  return (
    <Link to={`/${entity}/${getID(data)}`} className={className}>
      {children}
    </Link>
  );
};

const areEqual = (prev: WrapperProps, next: WrapperProps) => (prev.data.name === next.data.name);

export default memo(Wrapper, areEqual);
