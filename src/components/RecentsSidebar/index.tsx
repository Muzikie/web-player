import React from 'react';
import Album from '../Album';
import styles from './recentsSidebar.css';
import album1 from '../../assets/images/mocks/album1.png';
import album2 from '../../assets/images/mocks/album2.png';
import album3 from '../../assets/images/mocks/album3.png';
import album4 from '../../assets/images/mocks/album4.png';
import album5 from '../../assets/images/mocks/album5.png';
import album6 from '../../assets/images/mocks/album6.png';
import album7 from '../../assets/images/mocks/album7.png';
import album8 from '../../assets/images/mocks/album8.png';

const RecentsSidebar = () => {
  const list = [
    { file: album1, name: 'album1' },
    { file: album2, name: 'album2' },
    { file: album3, name: 'album3' },
    { file: album4, name: 'album4' },
    { file: album5, name: 'album5' },
    { file: album6, name: 'album6' },
    { file: album7, name: 'album7' },
    { file: album8, name: 'album8' },
  ];
  return (
    <aside className={`${styles.sidebar} ${styles.right}`}>
      <div className={styles.list}>
        {
          list.map((item) => (<Album key={item.name} data={item} />))
        }
      </div>
    </aside>
  );
};

export default RecentsSidebar;
