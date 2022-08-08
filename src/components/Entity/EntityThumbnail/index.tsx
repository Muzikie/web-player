import React from 'react';
import { Link } from 'wouter';
import { EntityRowProps, Entity } from '../types';
import { getEntity } from '../utils';
import trackImage from '@mock/album7.png';
import styles from './entityThumbnail.css';

const EntityThumbnail = ({ data, className = '' }: EntityRowProps<Entity>) => {
  const entity = getEntity(data);

  return (
    <section className={`${styles.wrapper} ${styles[entity]} ${className}`}>
      <Link href={`/${entity}/${data.id}`}>
        <figure>
          <img src={trackImage} alt={ data.name } />
        </figure>
      </Link>
    </section>
  );
};

export default EntityThumbnail;
