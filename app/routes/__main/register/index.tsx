/* External dependencies */
import React from 'react';

/* Internal dependencies */
import { PartialView } from '~/components/PartialView';
import { SecretKey } from '~/components/SecretKey';
import ActionAndInfo from '~/components/ActionAndInfo';
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

const RegisterScreen = () => (
  <PartialView
    title="Register"
    className="register"
    form={<SecretKeyGenerator />}
    actionAndInfo={<ActionAndInfo />}
  />
);

export default RegisterScreen;
