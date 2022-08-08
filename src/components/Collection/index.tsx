import React from 'react';
import styles from './collection.css';
import EntityRow from '../Entity/EntityRow';
import { CollectionProps } from './types';



const Collection = ({
  className = '',
  direction = 'vertical',
  itemsPerColumn = '1',
  itemTheme,
  title,
  items = [],
}: CollectionProps) => {
  const rowItems = `rowItems-${itemsPerColumn}`
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
        <div className={`${styles.itemsContainer} ${styles[rowItems]}`}>
          {
            items.map((item, index) => (<EntityRow key={`item-${item.id}-${index}`} data={item} theme={itemTheme} />))
          }
        </div>
      </div>
    </section>
  );
}

export default Collection;
