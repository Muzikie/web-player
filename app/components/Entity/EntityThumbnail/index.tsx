import React from 'react';

import Image from '~/components/common/Image';
import { EntityRowProps, Entity } from '../types';
import { API_URLS, SUFFIXES } from '~/configs';
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
        <Image
          src={`${API_URLS.STORAGE}/${id}${SUFFIXES[entity].primary}.jpg`}
          placeHolder="/images/artist.jpg"
          alt={data.name} 
        />
      </figure>
    </section>
  );
};

export default EntityThumbnail;
