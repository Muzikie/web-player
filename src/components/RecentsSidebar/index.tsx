import React from 'react';
import Collection from '../Collection';
import styles from './recentsSidebar.css';
import data from './data.json';

const RecentsSidebar = () => {
  const albums = data;
  return (
    <aside className={`${styles.sidebar} ${styles.right}`}>
      <Collection albums={albums} />
    </aside>
  );
};

export default RecentsSidebar;
