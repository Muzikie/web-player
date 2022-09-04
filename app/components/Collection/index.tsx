import React from 'react';
import EntityRow from '~/components/Entity/EntityRow';
import { CollectionProps, collectionThemes } from './types';
import { entityThemes } from '~/components/Entity/types';

const Collection = ({
  className = '',
  direction = 'vertical',
  theme = collectionThemes.normal,
  itemTheme = entityThemes.normal,
  title,
  items = [],
}: CollectionProps) => {
  return (
    <section className={`component collection ${direction} ${className}`}>
      {
        title ? (
          <header>
            <h4>{title}</h4>
          </header>
        ): null
      }
      <div className="itemsFrame">
        <div className={`itemsContainer ${theme}`}>
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
