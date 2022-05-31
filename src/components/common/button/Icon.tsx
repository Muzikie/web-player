

import React, { MouseEvent } from 'react';
import Icon from '../Icon';
import styles from './button.css';

interface IconButtonProps {
  icon: string;
  className?: string;
  onClick: (event: MouseEvent<HTMLButtonElement>) => void;
}

const IconButton = ({ onClick, className, icon }: IconButtonProps) => (
  <button
    className={`${styles.button} ${styles.icon} ${className}`}
    onClick={onClick}
  >
    <Icon name={icon}/>
  </button>
);

export default IconButton;
