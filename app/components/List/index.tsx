import React from 'react';
import EntityRow from '~/components/Entity/EntityRow';
import { LiskProps, liskThemes } from './types';
import { entityThemes } from '~/components/Entity/types';
import EmptyState from '../common/EmptyState';
import { getID } from '~/components/Entity/utils';

const List = ({
  className = '',
  direction = 'vertical',
  theme = liskThemes.normal,
  itemTheme = entityThemes.ProfilePage,
  title,
  items = [],
  showRowNumber,
  emptyState,
}: LiskProps) => {
  if (items.length === 0) {
    return (
      <EmptyState
        title={emptyState?.title ?? 'Nothing found'}
        subtitle={emptyState?.title}
        content={emptyState?.content}
      />
    );
  }

  return (
    <section className={`component list ${direction} ${className}`}>
      {
        title ? (
          <header>
            <h4>{title}</h4>
          </header>
        ) : null
      }
      <div className="itemsFrame">
        <div className={`itemsContainer ${theme}`}>
          {
            items.map((item, index) => (
              <EntityRow
                key={`item-${getID(item)}-${index}`}
                data={item}
                theme={itemTheme}
                rowNumber={index + 1}
                showRowNumber={showRowNumber}
              />
            ))
          }
        </div>
      </div>
    </section>
  );
};

export default List;
