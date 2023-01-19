import React from 'react';
import EntityRow from '~/components/Entity/EntityRow';
import { LiskProps, liskThemes } from './types';
import { entityThemes } from '~/components/Entity/types';
import { getID } from '~/components/Entity/utils';

const List = ({
  className = '',
  direction = 'vertical',
  theme = liskThemes.normal,
  itemTheme = entityThemes.normal,
  title,
  items = [],
}: LiskProps) => {
  return (
    <section className={`component list ${direction} ${className}`}>
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
                key={`item-${getID(item)}-${index}`}
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

export default List;
