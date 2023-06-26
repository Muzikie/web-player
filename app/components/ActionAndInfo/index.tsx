import React from 'react';
import { useNavigate } from 'react-router-dom';

import { PrimaryButton } from '~/components/common/Button';
import Icon from '~/components/common/Icon';

const ActionAndInfo = () => {
  const navigate = useNavigate();

  const register = () => {
    navigate('/register');
  };

  return (
    <section className="actionAndInfo">
      <Icon name="info" className="warningIcon" />
      <h2>There is no Forgot<br />password option</h2>
      <h3>If you lose your secret key, no one<br />can restore it. Keep it safe!</h3>
      <PrimaryButton onClick={register} theme="white">
        I understand, let&apos;s save password
      </PrimaryButton>
    </section>
  );
};

export default ActionAndInfo;
