/* External dependencies */
import React, { useState, useEffect } from 'react';
import { useFetcher, useLoaderData } from '@remix-run/react';

/* Internal dependencies */
import { PrimaryButton } from '~/components/common/Button';
import SecretKeyInput from '~/components/SecretKeyInput';
import { useAccount } from '~/hooks/useAccount/useAccount';

const LoginForm = () => {
  const profileInfo = useLoaderData();
  const fetcher = useFetcher();
  const [secret, setSecret] = useState({ value: '', isValid: false });
  const { setProfileInfo, info } = useAccount();

  useEffect(() => {
    if (profileInfo.address !== info.address) {
      setProfileInfo(profileInfo);
    }
  }, [profileInfo]);

  return (
    <fetcher.Form method="post">
      <SecretKeyInput onChange={setSecret} />
      <PrimaryButton
        type="submit"
        disabled={!secret.isValid}
        className="loginButton"
      >
        Login
      </PrimaryButton>
    </fetcher.Form>
  );
};

export default LoginForm;
