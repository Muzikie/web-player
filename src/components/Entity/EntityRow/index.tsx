import React from 'react';
import { Link } from 'wouter';
import EntityThumbnail from '../EntityThumbnail';
import Actions from '../Actions';
import styles from './entityRow.css';
import { Entity, EntityRowProps, entityThemes } from '../types';
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

const EntityRow = ({
  data, className = '', theme = entityThemes.normal,
}: EntityRowProps<Entity>) => {
  const entity = getEntity(data);
  console.log('theme', theme);

  return (
    <Link href={`/${entity}/${data.id}`}>
      <section className={`${styles.wrapper} ALI ${styles[entity]} ${styles[theme]} ${className}`}>
        <div className={styles.container}>
          <div className={styles.primaryInfo}>
            {
              ('duration' in data) ? null : (
                <EntityThumbnail
                  data={data}
                  theme={theme}
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
        </div>
      </section>
    </Link>
  );
};

export default EntityRow;
