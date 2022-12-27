import React from 'react';
import { memo, ReactNode, MouseEvent, useContext } from 'react';
import { PlayerContext } from '~/context/playerContext/playerContextProvider';
import { Link } from '@remix-run/react';
import { Entity, entityMode, TrackType } from '../types';

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
    <Link to={`/${entity}/${data.id}`} className={className}>
      {children}
    </Link>
  );
};

const areEqual = (prev: WrapperProps, next: WrapperProps) => (prev.data.id === next.data.id);

export default memo(Wrapper, areEqual);
