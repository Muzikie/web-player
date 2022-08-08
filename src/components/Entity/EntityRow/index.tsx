import React from 'react';
import { Link } from 'wouter';
import EntityThumbnail from '../EntityThumbnail';
import Actions from '../Actions';
import styles from './entityRow.css';
import { Entity, EntityRowProps } from '../types';
import { getEntity } from '../utils';

const Subtitle = ({ data }: EntityRowProps<Entity>) => {
  let subtitle = '-';
  if ('creationDate' in data) {
    subtitle = 'Lana Del Rey and others';
  } else if ('releaseDate' in data || 'duration' in data) {
    subtitle = data.artistName;
  } else {
    subtitle = `${data.albums.length} Albums`;
  }

  return (
    <span className={styles.artistName}>{subtitle}</span>
  )
};

const EntityRow = ({ data, theme = '', className = '' }: EntityRowProps<Entity>) => {
  const entity = getEntity(data);

  return (
    <Link
      href={`/${entity}/${data.id}`}
      className={`${styles.wrapper} ${styles[theme]} ${className}`}
    >
      <div className={styles.primaryInfo}>
        {
          ('duration' in data) ? null : (
            <EntityThumbnail
              data={data}
              className={styles.thumbnail}
            />
          )
        }
        <div className={styles.text}>
          <h4 className={styles.albumName}>{ data.name }</h4>
          <Subtitle data={data} />
        </div>
      </div>
      <Actions data={data} />
    </Link>
  );
};

export default EntityRow;
