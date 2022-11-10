/* External dependencies */
import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';

/* Internal dependencies */
import { ProfileContext } from '~/context/profileContextProvider';
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
  const navigate = useNavigate();
  const agreed = false;

  const login = () => {
    setSecretKey(secret.value);

    // @todo Make API call to retrieve account info
    // If they have subscribed, navigate to home, else, navigate to subscription page
    setProfileInfo({
      address: '0x1234567890',
      publicKey: '0x1234567890',
    });

    navigate(agreed ? '/' : '/agreement');
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