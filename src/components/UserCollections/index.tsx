import React from 'react';
import { TextLink } from '../common/Link';
import styles from './userCollections.css';

const UserCollections = () => {
  const list = [
    { title: 'Party 80s album second', target: 'party80s-href' },
    { title: 'Party 90s', target: 'party90s-href' }
  ];
  return (
    <section className={styles.wrapper}>
      <ul>
        {
          list.map((item) => (<li key={item.target}><TextLink {...item} /></li>))
        }
      </ul>
    </section>
  );
};

export default UserCollections;
