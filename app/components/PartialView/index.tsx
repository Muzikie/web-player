/* External dependencies */
import React from 'react';

/* Internal dependencies */
import ExtendedLogo from '~/components/Logo/Extended';
import Modal from '~/components/Modal';
import { PartialViewProps } from './type';

export const PartialView = ({
  title,
  form,
  actionAndInfo,
  className,
}: PartialViewProps) => (
  <section className={`component partialView screen ${className}`}>
    <section className='popup'>
      <header className="header">
        <ExtendedLogo />
      </header>
      <section className="wrapper">
        <h3>{title}</h3>
        {form}
      </section>
      <Modal>
        {actionAndInfo}
      </Modal>
    </section>
  </section>
);
