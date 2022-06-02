import React from 'react';
import Collection from '../Collection';
import styles from './recentsSidebar.css';
import data from './data.json';

const RecentsSidebar = () => {
  const albums = data;
  return (
    <aside className={styles.wrapper}>
      <Collection albums={albums} />
    </aside>
  );
};

export default RecentsSidebar;
