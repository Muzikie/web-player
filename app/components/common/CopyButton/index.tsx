import React, { useState } from 'react';
import copyToClipboard from '~/helpers/copyToClipboard';
import Icon from '../Icon';
import { CopyButtonProps } from './types';

const CopyButton = ({ text }: CopyButtonProps) => {
  const [isCopied, setIsCopied] = useState(false);
  const copyHandler = () => {
    copyToClipboard(text, () => setIsCopied(true));
    setTimeout(() => {
      setIsCopied(false);
    }, 2000);
  }
  const icon = isCopied ? 'check' : 'copy';
  return (
    <button className='copyAddress' onClick={() => copyHandler()}>
      <Icon name={icon} />
    </button>
  );
}

export default CopyButton;
