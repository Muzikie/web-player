/* External dependencies */
import React, { useState, useRef, useEffect } from 'react';
import { IconButton } from '../common/Button';

export const SecretKey = () => {
  const timeout = useRef();
  const secretKey = 'grief like hint ranch steak fuel danger despair submit sadness crack envelope';
  const [copyIcon, setCopyIcon] = useState('copy');
  const copy = () => {
    setCopyIcon('check');
    navigator?.clipboard?.writeText(secretKey)
      .finally(() => {
        clearTimeout(timeout.current);
        setTimeout(() => {
          setCopyIcon('copy');
        }, 2000);
      });
  };

  useEffect(() => () => clearTimeout(timeout.current));

  return (
    <section className='component secretKey'>
      <p>{secretKey}</p>
      <IconButton
        icon={copyIcon}
        onClick={copy}
        className="copyButton"
      />
    </section>
  );
};

