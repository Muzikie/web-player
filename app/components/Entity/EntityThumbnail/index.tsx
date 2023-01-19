import React from 'react';

import { EntityRowProps, Entity, entityThemes } from '../types';
import { API_URLS } from '~/configs/api';
import { getEntity, getCollectionID } from '../utils';

const EntityThumbnail = ({
  data, className = '', theme = entityThemes.normal,
}: EntityRowProps<Entity>) => {

  const entity = getEntity(data);
  const wrapper = `component entity thumbnail ${entity} ${theme} ${className}`;
  const id = getCollectionID(data);

  return (
    <section className={wrapper}>
      <figure>
        <img src={`${API_URLS.STREAMER}/${id}.jpg`} alt={data.name} />
      </figure>
    </section>
  );
};

export default EntityThumbnail;
