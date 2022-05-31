
import React, { MouseEvent, ReactElement } from 'react';
import styles from './button.css';

interface TertiaryButtonProps {
  className?: string;
  children: string|ReactElement;
  onClick: (event: MouseEvent<HTMLButtonElement>) => void;
}

const TertiaryButton = ({ children, onClick, className }: TertiaryButtonProps) => (
  <button
    className={`${styles.button} ${styles.tertiary} ${className}`}
    onClick={onClick}
  >
    { children }
  </button>
);

export default TertiaryButton;
