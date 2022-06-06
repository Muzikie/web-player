import React from 'react';
import { modals } from '../routes';
import { useQueryParams } from '../../hooks';
import styles from './modal.css';

interface  ModalProps {
  alignment?: 'centered'|'topAligned';
}

function Modal ({ alignment = 'centered' }: ModalProps) {
  const [queryParams, _, removeQueryParam] = useQueryParams();
  
  const close = () => {
    removeQueryParam('modal');
  };

  console.log('-->', queryParams.modal);

  if (!queryParams.modal) {
    return null;
  }

  if (!modals[queryParams.modal]) {
    console.log('The queried modal was not found.', queryParams.modal);
    return null;
  }

  const Component = modals[queryParams.modal].component;
  return (
    <div className={`${styles.wrapper} inModal ${alignment}`}>
      <div
        className={styles.backdrop}
        onClick={close}
      />
      <Component key="in-modal" />
    </div>
  );
}

export default Modal;
