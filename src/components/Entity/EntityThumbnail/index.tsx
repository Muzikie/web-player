import React from 'react';
import { Link } from 'wouter';
import { EntityRowProps, Entity, entityThemes } from '../types';
import { getEntity } from '../utils';
import trackImage from '@mock/album7.png';
import styles from './entityThumbnail.css';

const EntityThumbnail = ({
  data, className = '', theme = entityThemes.normal,
}: EntityRowProps<Entity>) => {

  const entity = getEntity(data);
  const wrapper = `${styles.wrapper} ${styles[entity]} ${styles[theme]} ${className}`;

  return (
    <section className={wrapper}>
      <Link href={`/${entity}/${data.id}`}>
        <figure>
          <img src={trackImage} alt={ data.name } />
        </figure>
      </Link>
    </section>
  );
};

export default EntityThumbnail;
