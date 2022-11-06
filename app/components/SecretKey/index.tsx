/* External dependencies */
import React, { useState, useRef, useEffect } from 'react';
import { generateMnemonic } from 'bip39';

/* Internal dependencies */
import { IconButton } from '../common/Button';

export const SecretKey = () => {
  const timeout = useRef();
  const [secretKey, setSecretKey] = useState('');
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

  useEffect(() => {
    const value = generateMnemonic();
    setSecretKey(value);

    return () => clearTimeout(timeout.current);
  }, []);

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

