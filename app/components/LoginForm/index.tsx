/* External dependencies */
import React from 'react';
import { useFetcher } from '@remix-run/react';

/* Internal dependencies */
import { PrimaryButton } from '~/components/common/Button';
import SecretKeyInput from '~/components/SecretKeyInput';
import { useForm } from 'react-hook-form';
import { validateSecretKey } from '~/helpers/validators';

const LoginForm = () => {
  const fetcher = useFetcher();
  const { register, watch } = useForm();
  const secretKey = watch('passphrase');

  return (
    <fetcher.Form method="post">
      <SecretKeyInput register={register}/>
      <PrimaryButton
        type="submit"
        disabled={!validateSecretKey(secretKey)}
        className="loginButton"
      >
        Login
      </PrimaryButton>
    </fetcher.Form>
  );
};

export default LoginForm;
