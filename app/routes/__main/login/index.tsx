/* External dependencies */
import React, { useState, useEffect } from 'react';
import { cryptography } from '@liskhq/lisk-client';
import { useFetcher, useLoaderData } from '@remix-run/react';
import { useNavigate } from 'react-router-dom';
import { json, redirect } from '@remix-run/node';

/* Internal dependencies */
import { PrimaryButton } from '~/components/common/Button';
import { getSession, commitSession } from '~/hooks/useSession';
import { PartialView } from '~/components/PartialView';
import SecretKeyInput from '~/components/SecretKeyInput';
import { DERIVATION_PATH } from '~/constants/app';
import { LoaderBaseProps } from '../../types';
import styles from '~/css/routes/__main/login.css';
import { useAccount } from '~/hooks/useAccount/useAccount';

export const validateCredentials = async (secret: string) => {
  const privateKey = await cryptography.ed.getPrivateKeyFromPhraseAndPath(secret, DERIVATION_PATH);
  const publicKey = cryptography.ed.getPublicKeyFromPrivateKey(privateKey);
  const address = cryptography.address.getLisk32AddressFromPublicKey(publicKey);

  return {
    address,
    publicKey,
    privateKey,
  }
}

export function links() {
  return [{ rel: 'stylesheet', href: styles }];
}

export async function loader({ request }: LoaderBaseProps) {
  const session = await getSession(
    request.headers.get('Cookie')
  );

  let address = session.get('address');

  // Handle logout and login
  const chunks = request.url.split(/\?action=/);
  if (chunks.length === 2 && chunks[1] === 'logout') {
    session.unset('address');
    session.unset('publicKey');
    session.unset('privateKey');
  // Redirect to the home page if they are already signed in and they are not trying to logout.
  } else if (address) {
    return redirect('/');
  }

  address = session.get('address');
  const publicKey = session.get('publicKey');
  const privateKey = session.get('privateKey');

  return json({
    address: address ?? '',
    publicKey: publicKey ? Buffer.from(publicKey).toString('hex') : '',
    privateKey: privateKey ? Buffer.from(privateKey).toString('hex') : '',
  }, {
    headers: {
      'Set-Cookie': await commitSession(session),
    },
  });
}

export async function action({ request }: LoaderBaseProps) {
  const session = await getSession(
    request.headers.get('Cookie')
  );
  const form = await request.formData();
  const passphrase = `${form.get('passphrase') ?? ''}`;

  const { address, publicKey, privateKey } = await validateCredentials(
    passphrase
  );

  if (address == null) {
    session.flash('error', 'Invalid username/password');

    // Redirect back to the login page with errors.
    return redirect('/login', {
      headers: {
        'Set-Cookie': await commitSession(session),
      },
    });
  }

  session.set('address', address);
  session.set('publicKey', publicKey);
  session.set('privateKey', privateKey);

  // Login succeeded, send them to the home page.
  return redirect('/', {
    headers: {
      'Set-Cookie': await commitSession(session),
    },
  });
}

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

const LoginScreen = () => (
  <PartialView
    title="Login"
    className="login"
    form={<LoginForm />}
    actionAndInfo={<ActionAndInfo />}
  />
);

export default LoginScreen;
