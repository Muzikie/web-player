/* External dependencies */
import React from 'react';
import { useNavigate } from 'react-router-dom';

/* Internal dependencies */
import { PrimaryButton } from '~/components/common/Button';

const LoginPrompt = () => {
  const navigate = useNavigate();

  const goToLogin = () => {
    navigate('/login');
  };

  return (
    <>
      <section className="playingMusic">
        <header>
          <h5>Login before you continue</h5>
          <span>Or sign up and get 2 month free</span>
        </header>
      </section>
      <PrimaryButton
        className='loginButton'
        theme="white"
        onClick={goToLogin}
      >
        Login
      </PrimaryButton>
    </>
  );
}

export default LoginPrompt;
