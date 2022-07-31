

import React from 'react';
import { IconButtonProps } from './type';
import Icon from '../Icon';
import styles from './button.css';

const IconButton = ({ onClick, className, icon, theme = '' }: IconButtonProps) => {
  const themeStyles = theme.split(' ').map(item => styles[item]).join(' ')
  return (
    <button
      className={`${styles.button} ${styles.icon} ${themeStyles} ${className}`}
      onClick={onClick}
    >
      <Icon name={icon}/>
    </button>
  );
};

export default IconButton;
