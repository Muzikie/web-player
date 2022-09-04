import React from 'react';
import { IconProps } from './type';

const Icon = ({ name, className = '' }: IconProps) => (
  <i className={`component icon ${name} ${className}`}></i>
);

export default Icon;
