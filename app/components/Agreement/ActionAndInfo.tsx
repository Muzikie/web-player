import React from 'react';
import { Link } from 'react-router-dom'
import { Form } from '@remix-run/react'

/* Internal dependencies */
import { AgreementInfoProps } from './types'
import { PrimaryButton } from '../common/Button'


const ActionAndInfo = ({ disabled }: AgreementInfoProps) => {
  return (
    <footer>
      <h4>
        <span>By using Muzikie you declare that you have read and agreed to our </span>
        <Link to="/agreements">
          full user agreement
        </Link>
        <span>.</span>
      </h4>
      <Form method="post">
        <PrimaryButton type="submit" disabled={disabled} className="loginButton" theme="white">
          Continue
        </PrimaryButton>
      </Form>
    </footer>
  );
};

export default ActionAndInfo;
