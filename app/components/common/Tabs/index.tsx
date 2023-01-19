import React from 'react';
import { TabsProps, TabItem } from './types';
import { Link } from '~/components/common/Link';

export const Tabs = ({
  items,
}: TabsProps) => (
  <div className='component tabs'>
    {
      items.map((item: TabItem) => (
        <Link
          className='tab'
          key={item.to}
          to={item.to}
        >
          <div className='item'>
            <h4>
              {item.title}
            </h4>
          </div>
        </Link>
      ))
    }
  </div>
);
