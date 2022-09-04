import React from 'react';
import { EntityRowProps, Entity, entityThemes } from '../types';
import { getEntity } from '../utils';

const EntityThumbnail = ({
  data, className = '', theme = entityThemes.normal,
}: EntityRowProps<Entity>) => {

  const entity = getEntity(data);
  const wrapper = `component entity thumbnail ${entity} ${theme} ${className}`;

  return (
    <section className={wrapper}>
      <figure>
        <img src={data.image} alt={ data.name } />
      </figure>
    </section>
  );
};

export default EntityThumbnail;
