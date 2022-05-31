
import React, { MouseEvent, ReactElement } from 'react';
import styles from './button.css';

interface SecondaryButtonProps {
  className?: string;
  children: string|ReactElement;
  onClick: (event: MouseEvent<HTMLButtonElement>) => void;
}

const SecondaryButton = ({ children, onClick, className }: SecondaryButtonProps) => (
  <button
    className={`${styles.button} ${styles.secondary} ${className}`}
    onClick={onClick}
  >
    { children }
  </button>
);

export default SecondaryButton;
