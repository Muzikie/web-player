import React from 'react';
import styles from './collection.css';
import EntityRow from '../Entity/EntityRow';
import { CollectionProps, collectionThemes } from './types';
import { entityThemes } from '../Entity/types';

const Collection = ({
  className = '',
  direction = 'vertical',
  theme = collectionThemes.normal,
  itemTheme = entityThemes.normal,
  title,
  items = [],
}: CollectionProps) => {
  return (
    <section className={`${styles.wrapper} ${styles[direction]} ${className}`}>
      {
        title ? (
          <header>
            <h4>{title}</h4>
          </header>
        ): null
      }
      <div className={styles.itemsFrame}>
        <div className={`${styles.itemsContainer} ${styles[theme]}`}>
          {
            items.map((item, index) => (
              <EntityRow
                key={`item-${item.id}-${index}`}
                data={item}
                theme={itemTheme}
              />
            ))
          }
        </div>
      </div>
    </section>
  );
}

export default Collection;
