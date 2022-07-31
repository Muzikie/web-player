
import React from 'react';
import { FlexibleButtonProps } from './type';
import styles from './button.css';

const PrimaryButton = ({ children, onClick, className }: FlexibleButtonProps) => (
  <button
    className={`${styles.button} ${styles.primary} ${className}`}
    onClick={onClick}
  >
    { children }
  </button>
);

export default PrimaryButton;
