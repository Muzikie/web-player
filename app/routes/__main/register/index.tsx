/* External dependencies */
import React from 'react';
import { useNavigate } from 'react-router-dom';
/* Internal dependencies */
import { PrimaryButton } from '~/components/common/Button';
import { PartialView } from '~/components/PartialView';
import { SecretKey } from '~/components/SecretKey';
import Icon from '~/components/common/Icon';
import styles from '~/css/routes/__main/register.css';

export function links() {
  return [{ rel: 'stylesheet', href: styles }];
}

const SecretKeyGenerator = () => (
  <section className="secretKeyGenerator">
    <h4>Please carefully write down these 12 words and store them safely.</h4>
    <SecretKey />
  </section>
);

const ActionAndInfo = () => {
  const navigate = useNavigate();

  const login = () => {
    navigate('/login');
  };

  return (
    <section className="actionAndInfo">
      <Icon name="info" className="warningIcon" />
      <h2>There is no Forgot<br />password option</h2>
      <h3>If you lose your secret key, no one<br />can restore it. Keep it safe!</h3>
      <PrimaryButton onClick={login} theme="white">
        I understand, let&apos;s login
      </PrimaryButton>
    </section>
  );
};

const RegisterScreen = () => (
  <PartialView
    title="Register"
    className="register"
    form={<SecretKeyGenerator />}
    actionAndInfo={<ActionAndInfo />}
  />
);

export default RegisterScreen;
