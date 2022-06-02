import React from 'react';
import Icon from '../Icon';
import styles from './link.css';

interface IconLinkProps {
  icon: string;
  target: string;
}

const IconLink = ({ icon, target }: IconLinkProps) => (
  <a className={styles.iconLink} href={target}>
    <Icon name={icon} />
  </a>
);

export default IconLink;
