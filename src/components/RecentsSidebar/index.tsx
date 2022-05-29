import React from 'react';
import Album from '../Album';

const RecentsSidebar = () => {
  const list = ['album1', 'album2', 'album3', 'album4', 'album5', 'album6', 'album7', 'album8'];
  return (
    <aside className="sidebar right">
      <ul>
        {
          list.map((item) => (<li key={item}><Album name={item} /></li>))
        }
      </ul>
    </aside>
  );
};

export default RecentsSidebar;
