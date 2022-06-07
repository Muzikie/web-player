import React from 'react';
import { TextLink } from '../common/Link';
import styles from './userCollections.css';

const UserCollections = () => {
  const list = [
    { title: 'Party 80s Album Second', id: 'playlist-id-1' },
    { title: 'Party 90s', id: 'playlist-id-2' },
    { title: 'Auld Lang Syne', id: 'playlist-id-3' },
    { title: 'Weekend Hits', id: 'playlist-id-4' },
    { title: 'Happy Friday', id: 'playlist-id-5' },
    { title: 'Coding Focus', id: 'playlist-id-6' },
    { title: 'My Favorite Persian Songs', id: 'playlist-id-7' },
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
