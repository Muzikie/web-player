import { memo, ReactNode, MouseEvent, useContext } from 'react';
import { PlayerContext } from '~/context/playerContextProvider';
import { Link } from "@remix-run/react";
import { Entity, TrackType } from '../types';

interface WrapperProps {
  entity: string;
  className: string;
  data: Entity;
  children: ReactNode;
}

const Wrapper = ({
  entity, data, children, className,
}: WrapperProps) => {
  const { setCurrent } = useContext(PlayerContext);

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
      {/* @todo Remove a anchor from here. Are the styles ok? */}
      {children}
    </Link>
  );
};

const areEqual = (prev: WrapperProps, next: WrapperProps) => (prev.data.id === next.data.id);

export default memo(Wrapper, areEqual);
