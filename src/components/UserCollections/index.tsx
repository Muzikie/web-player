import React from 'react';
import { IconButton } from '../common/button';
import { TextLink, IconLink } from '../common/Link';
import styles from './userCollections.css';

const UserCollections = () => {
  const list = [
    { title: 'Party 80s', target: 'party80s-href' },
    { title: 'Party 90s', target: 'party90s-href' }
  ];
  return (
    <aside className={styles.wrapper}>
      <div>
        <IconLink icon="home" target="home" />
        <IconLink icon="settings" target="settings" />
        <IconLink icon="profile" target="profile" />
      </div>
      <ul>
        {
          list.map((item) => (<li key={item.target}><TextLink {...item} /></li>))
        }
      </ul>
    </aside>
  );
};

export default UserCollections;
