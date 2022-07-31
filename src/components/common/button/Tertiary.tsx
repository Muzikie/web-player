
import React from 'react';
import { FlexibleButtonProps } from './type';
import styles from './button.css';

const TertiaryButton = ({ children, onClick, className }: FlexibleButtonProps) => (
  <button
    className={`${styles.button} ${styles.tertiary} ${className}`}
    onClick={onClick}
  >
    { children }
  </button>
);

export default TertiaryButton;
