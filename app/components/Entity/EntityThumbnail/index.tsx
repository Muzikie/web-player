import React from 'react';
import { EntityRowProps, Entity, entityThemes } from '../types';
import { getEntity } from '../utils';

const EntityThumbnail = ({
  data, className = '', theme = entityThemes.normal,
}: EntityRowProps<Entity>) => {

  const entity = data ? getEntity(data) : 'empty';
  const wrapper = `component entity thumbnail ${entity} ${theme} ${className}`;

  return (
    <section className={wrapper}>
      <figure>
        <img src={data?.image ?? '/images/logo.svg'} alt={data?.name ?? 'Loading...'} />
      </figure>
    </section>
  );
};

export default EntityThumbnail;
