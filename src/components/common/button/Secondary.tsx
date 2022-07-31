
import React from 'react';
import { FlexibleButtonProps } from './type';
import styles from './button.css';

const SecondaryButton = ({ children, onClick, className }: FlexibleButtonProps) => (
  <button
    className={`${styles.button} ${styles.secondary} ${className}`}
    onClick={onClick}
  >
    { children }
  </button>
);

export default SecondaryButton;
