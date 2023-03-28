import React, { useEffect, useRef } from 'react';
import { ImageType } from './types'

const Image = ({ src, alt, className, placeHolder } : ImageType) => {
  const image = useRef<HTMLImageElement>(null);

  const imageNotFound = () => {
    if (image.current) {
      image.current.src = placeHolder;
    }
  };

  useEffect(() => {
    if (image.current?.naturalWidth === 0) {
      imageNotFound();
    }
  }, [src, image.current]);

  return (
    <img ref={image} className={className} src={src} alt={alt} />
  )
};

export default Image;
