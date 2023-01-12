import React from 'react';

import { EntityRowProps, Entity, entityThemes } from '../types';
import { API_URLS } from '~/constants/api';
import { getEntity, getID } from '../utils';

const EntityThumbnail = ({
  data, className = '', theme = entityThemes.normal,
}: EntityRowProps<Entity>) => {

  const entity = getEntity(data);
  const wrapper = `component entity thumbnail ${entity} ${theme} ${className}`;
  const extension = entity === 'track' ? 'mp3' : 'jpg';
  const id = getID(data);

  return (
    <section className={wrapper}>
      <figure>
        <img src={`${API_URLS.STREAMER}/${id}.${extension}`} alt={data.name} />
      </figure>
    </section>
  );
};

export default EntityThumbnail;
