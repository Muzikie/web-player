import React from 'react';
import TextLink from '../TextLink';
import styles from './userCollections.css';

const UserCollections = () => {
  const list = [
    { title: 'Party 80s', target: 'party80s-href' },
    { title: 'Party 90s', target: 'party90s-href' }
  ];
  return (
    <aside className={styles.wrapper}>
      <ul>
        {
          list.map((item) => (<li key={item.target}><TextLink data={item} /></li>))
        }
      </ul>
    </aside>
  );
};

export default UserCollections;
