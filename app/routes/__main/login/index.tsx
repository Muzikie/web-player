/* External dependencies */
import React, { useState, useContext } from 'react';
import { ed, address as liskAddress } from '@liskhq/lisk-cryptography';
import { useNavigate } from 'react-router-dom';

/* Internal dependencies */
import { defaultDerivationPath } from '~/constants/app';
import { ProfileContext } from '~/context/profileContextProvider';
import { SettingsContext } from '~/context/settingsContextProvider';
import { PrimaryButton } from '~/components/common/Button';
import { PartialView } from '~/components/PartialView';
import SecretKeyInput from '~/components/SecretKeyInput';
import styles from '~/styles/routes/__main/login.css';

export function links() {
  return [{ rel: 'stylesheet', href: styles }];
}

const LoginForm = () => {
  const [secret, setSecret] = useState({ value: '', isValid: false });
  const { setProfileInfo, setSecretKey } = useContext(ProfileContext);
  const { settings } = useContext(SettingsContext);
  const navigate = useNavigate();

  const login = async () => {
    setSecretKey(secret.value);
    const privateKey = await ed.getPrivateKeyFromPhraseAndPath(secret.value, defaultDerivationPath);
    const publicKey = ed.getPublicKeyFromPrivateKey(privateKey);
    const address = liskAddress.getLisk32AddressFromPublicKey(publicKey);

    // @todo Make API call to retrieve account info
    // If they have subscribed, navigate to home, else, navigate to subscription page
    setProfileInfo({
      address,
      publicKey: publicKey.toString('hex'),
    });

    navigate(settings.agreement ? '/' : '/agreement');
  };

  return (
    <>
      <SecretKeyInput onChange={setSecret} />
      <PrimaryButton
        onClick={login}
        disabled={!secret.isValid}
        className="loginButton"
      >
        Login
      </PrimaryButton>
    </>
  );
};

const ActionAndInfo = () => {
  const navigate = useNavigate();

  const goToRegister = () => {
    navigate('/register');
  };

  return (
    <>
      <h3>Not a member yet?</h3>
      <ul>
        <li>
          <span>⚡️</span>
          <span>You get 2 month free trial.</span>
        </li>
        <li>
          <span>😇</span>
          <span>You support music since Muzikie pays a whopping 80% share to artists.</span>
        </li>
        <li>
          <span>💰</span>
          <span>You receive 10% share of ad-supported profit.</span>
        </li>
      </ul>
      <PrimaryButton
        className='registerButton'
        theme="white"
        onClick={goToRegister}
      >
        Register
      </PrimaryButton>
    </>
  );
};

const Login = () => (
  <PartialView
    title="Login"
    className="login"
    form={<LoginForm />}
    actionAndInfo={<ActionAndInfo />}
  />
);

export default Login;
