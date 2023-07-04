import React, { useEffect, useRef, useState } from 'react';
import { ImageType } from './types';

const ImageComp = ({ src, alt, className, placeHolder }: ImageType) => {
  const image = useRef<HTMLImageElement>(null);
  const [isHydrated, setIsHydrated] = useState(false);
  useEffect(() => {
    setIsHydrated(true);
  }, []);

  const imageNotFound = () => {
    if (image.current && image.current?.naturalWidth === 0) {
      image.current.src = placeHolder;
    }
  };

  if (isHydrated) {
    return <img ref={image} className={className} src={src} alt={alt} onError={imageNotFound} />;
  }

  return (
    null
  );
};

export default ImageComp;
