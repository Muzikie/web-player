import React from 'react';
import { TabsProps, TabItem } from './types';
import { TextLink } from '~/components/common/Link';

export const Tabs = ({
  items,
}: TabsProps) => {
  const activeIndex = 0;
  return (
    <ul className='component tabs'>
      {
        items.map((item: TabItem, index: number) => (
          <li key={item.to} className={index === activeIndex ? 'active' : ''}>
            <h4>
              <TextLink
                title={item.title}
                to={item.to}
              />
            </h4>
          </li>
        ))
      }
    </ul>
  );
};
