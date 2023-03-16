import React from 'react';

import { EntityRowProps, Entity } from '../types';
import { API_URLS, FILES } from '~/configs';
import { getEntity, getID } from '../utils';

const EntityThumbnail = ({
  data, className = ''
}: EntityRowProps<Entity>) => {

  const entity = getEntity(data);
  const wrapper = `component entity thumbnail ${entity} ${className}`;
  const id = getID(data);

  return (
    <section className={wrapper}>
      <figure>
        <img src={`${API_URLS.STREAMER}/${id}-${FILES[entity]}.jpg`} alt={data.name} />
      </figure>
    </section>
  );
};

export default EntityThumbnail;
