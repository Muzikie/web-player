
import React, { MouseEvent, ReactElement } from 'react';
import styles from './button.css';

interface PrimaryButtonProps {
  className?: string;
  children: string|ReactElement;
  onClick: (event: MouseEvent<HTMLButtonElement>) => void;
}

const PrimaryButton = ({ children, onClick, className }: PrimaryButtonProps) => (
  <button
    className={`${styles.button} ${styles.primary} ${className}`}
    onClick={onClick}
  >
    { children }
  </button>
);

export default PrimaryButton;
