import React from 'react';
import styles from './icon.css';

interface IconProps {
  name: string;
  className?: string;
}

const Icon = ({ name, className = '' }: IconProps) => {
  const icon = styles[`icon-${name}`];
  return (
    <i className={`${icon} ${styles.icon} ${className}`}></i>
  );
};

export default Icon;
