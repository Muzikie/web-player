

import React, { MouseEvent } from 'react';
import Icon from '../Icon';
import styles from './button.css';

interface PlayButtonProps {
  theme?: string;
  className?: string;
  onClick: (event: MouseEvent<HTMLButtonElement>) => void;
}

const PlayButton = ({ onClick, className, theme = 'iconOnly' }: PlayButtonProps) => (
  <button
    className={`${styles.button} ${styles.play} primaryGradient ${styles[theme]} ${className}`}
    onClick={onClick}
  >
    <Icon name="play"/>
  </button>
);

export default PlayButton;
