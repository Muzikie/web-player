/* External dependencies */
import React, { useState, useEffect } from 'react';
import { useFetcher, useLoaderData } from '@remix-run/react';

/* Internal dependencies */
import { PrimaryButton } from '~/components/common/Button';
import SecretKeyInput from '~/components/SecretKeyInput';
import { useAccount } from '~/hooks/useAccount/useAccount';
import { useForm } from 'react-hook-form'
import { validateSecretKey } from '~/helpers/validators'

const LoginForm = () => {
  const profileInfo = useLoaderData();
  const fetcher = useFetcher();
  // const [secret, setSecret] = useState({ value: '', isValid: false });
  const { setProfileInfo, info } = useAccount();
  const { register, handleSubmit, formState, watch } = useForm<any>();
  const secretKey = watch('passphrase');


  useEffect(() => {
    if (profileInfo.address !== info.address) {
      setProfileInfo(profileInfo);
    }
  }, [profileInfo]);

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
