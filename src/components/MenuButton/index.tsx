import React from 'react';
import { IconLink } from '../common/Link';
import { useQueryParams } from '../../hooks';
import styles from './menuButton.css';

const MenuButton = () => {
  const [queryParams] = useQueryParams();

  return (
    <section className={styles.wrapper}>
      {
        queryParams.modal === 'menu'
          ? (
            <IconLink
              className={styles.menuButton}
              icon={'cross'}
              href="?"
            />
          ) : (
            <IconLink
              className={styles.menuButton}
              icon={'menu'}
              href="?modal=menu"
            />
          )
      }
    </section>
  );
};

export default MenuButton;
