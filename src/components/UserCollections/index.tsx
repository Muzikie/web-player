import React from 'react';
import { TextLink } from '../common/Link';
import styles from './userCollections.css';

const UserCollections = () => {
  const list = [
    { title: 'Party 80s album second', id: 'playlist-id-1' },
    { title: 'Party 90s', id: 'playlist-id-2' }
  ];
  return (
    <section className={styles.wrapper}>
      <ul>
        {
          list.map((item) => (
            <li key={item.id}>
              <TextLink title={item.title} href={`/playlist/${item.id}`} />
            </li>
          ))
        }
      </ul>
    </section>
  );
};

export default UserCollections;
