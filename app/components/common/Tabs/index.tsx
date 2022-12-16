import React from 'react';
import { TabsProps, TabItem } from './types';
import { TextLink } from '~/components/common/Link';

export const Tabs = ({
  items,
}: TabsProps) => (
  <div className='component tabs'>
    {
      items.map((item: TabItem) => (
        <TextLink
          className='tab'
          key={item.to}
          title={
            <div className='item'>
              <h4>
                {item.title}
              </h4>
            </div>
          }
          to={item.to}
        />
      ))
    }
  </div>
);
