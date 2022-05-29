import React from 'react';
import './icon.css';

interface IconProps {
  name: string;
  className?: string;
}

const Icon = ({ name, className }: IconProps) => (
  <i className={`icon-${name} ${className}`}></i>
);

export default Icon;
