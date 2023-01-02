/* External dependencies */
import React from 'react';
import {useNavigate} from 'react-router-dom';

/* Internal dependencies */
import { PrimaryButton } from '~/components/common/Button';
import { FeedbackProps, PlayerState } from './types';

const Feedback = ({ type }: FeedbackProps) => {
  const navigate = useNavigate();
  const config = type === PlayerState.loginError
    ? {
      title: 'Login before you continue',
      subtitle: 'Or sign up and get 2 month free',
      destination : '/login',
      buttonTitle: 'Login',
    } : {
      title: 'You need subscription',
      subtitle: 'to continue listening to music',
      destination : '/subscription',
      buttonTitle: 'Subscribe',
    };

  const goTo = () => {
    navigate(config.destination);
  };

  return (
    <>
      <section className="playingMusic">
        <header>
          <h5>{config.title}</h5>
          <span>{config.subtitle}</span>
        </header>
      </section>
      <PrimaryButton
        className="loginButton"
        theme="white"
        onClick={goTo}
      >
        {config.buttonTitle}
      </PrimaryButton>
    </>
  );
};

export default Feedback;
