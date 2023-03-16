import React from 'react';
import { Entity, EntityRowProps } from '../types';

const Fit = ({ data }: EntityRowProps<Entity>) => {
  if (!('fit' in data)) return null;

  return (
    <>
      {
        data.fit.map((item, index) => <span key={index}>,{item}</span>)
      }
    </>
  );
};

export default Fit;
