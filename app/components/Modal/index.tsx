import React, { useState } from 'react';
import { IconButton } from '~/components/common/Button';
import { ModalProps } from './types';

const Modal = ({
  discardable = false, theme = 'dark', modalRelative, onDiscard, children, className = '',
}: ModalProps) => {
  const [discarded, setDiscarded] = useState(false);
  const discard = () => {
    // Discard the modal
    setDiscarded(true);

    // then call the onDiscard callback
    if (typeof onDiscard === 'function') {
      onDiscard();
    }
  };

  return (
    <section className={`component modal ${discarded ? 'discarded' : ''} ${className} ${theme} ${modalRelative ? 'modalRelative' : ''}`}>
      {
        discardable
          ? (
            <IconButton
              icon="cross"
              className="discardButton"
              onClick={discard}
            />
          )
          : null
      }
      <div className="content">
        {children}
      </div>
    </section>
  );
};

export default Modal;
