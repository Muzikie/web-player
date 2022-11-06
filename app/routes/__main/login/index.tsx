/* External dependencies */
import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';

/* Internal dependencies */
import { ProfileContext } from '~/context/profileContextProvider';
import { PrimaryButton } from '~/components/common/Button';
import ExtendedLogo from '~/components/Logo/Extended';
import SecretKeyInput from '~/components/SecretKeyInput';
import Modal from '~/components/Modal';
import styles from '~/styles/routes/__main/login.css';

export function links() {
  return [{ rel: 'stylesheet', href: styles }];
}

const Login = () => {
  const [secret, setSecret] = useState({ value: '', isValid: false });
  const { setProfileInfo, setSecretKey } = useContext(ProfileContext);
  const agreed = false;
  const navigate = useNavigate();

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
    <section className="screen login">
      <section className='popup'>
        <header className="header">
          <ExtendedLogo />
        </header>
        <section className="wrapper">
          <h3>Login</h3>
          <SecretKeyInput onChange={setSecret} />
          <PrimaryButton
            onClick={login}
            disabled={!secret.isValid}
            className="loginButton"
          >
            Login
          </PrimaryButton>
        </section>
        <Modal>
          <h3>Not a member yet?</h3>
          <ul>
            <li>
              <span>⚡️</span>
              <span>your get 2 month free trial.</span>
            </li>
            <li>
              <span>😇</span>
              <span>your support music since Muzikie pays a whopping 80% share to artists.</span>
            </li>
            <li>
              <span>💰</span>
              <span>You receive 10% share of ad-driven profit.</span>
            </li>
          </ul>
          <PrimaryButton
            className='registerButton'
            theme="white"
            onClick={() => console.log('Implement Register method')}
          >
            Register
          </PrimaryButton>
        </Modal>
      </section>
    </section>
  );
};

export default Login;
