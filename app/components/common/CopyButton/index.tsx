import React, { useEffect, useRef, useState } from 'react';
import copyToClipboard from '~/helpers/copyToClipboard';
import Icon from '../Icon';
import { CopyButtonProps, Timeout } from './types';

const CopyButton = ({ text }: CopyButtonProps) => {
  const [isCopied, setIsCopied] = useState(false);
  const timer = useRef<Timeout>();

  const copyHandler = () => {
    copyToClipboard(text, () => setIsCopied(true));
    timer.current = setTimeout(() => {
      setIsCopied(false);
    }, 2000);
  };

  useEffect(() => () => clearTimeout(timer.current), []);

  const icon = isCopied ? 'check' : 'copy';
  return (
    <button className='copyAddress' onClick={copyHandler}>
      <Icon name={icon} />
    </button>
  );
};

export default CopyButton;
