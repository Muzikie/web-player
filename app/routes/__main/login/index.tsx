/* External dependencies */
import React from 'react';
import { json, redirect } from '@remix-run/node';

/* Internal dependencies */
import { validateCredentials } from '~/helpers/cryptography';
import LoginForm from '~/components/LoginForm';
import RegisterSuggestion from '~/components/RegisterSuggestion';
import { getSession, commitSession } from '~/hooks/useSession';
import { PartialView } from '~/components/PartialView';
import { LoaderBaseProps } from '../../types';
import { bufferize } from '~/helpers/convertors';
import styles from '~/css/routes/__main/login.css';


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
    publicKey: publicKey ? bufferize(publicKey).toString('hex') : '',
    privateKey: privateKey ? bufferize(privateKey).toString('hex') : '',
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

const LoginScreen = () => (
  <PartialView
    title="Login"
    className="login"
    form={<LoginForm />}
    actionAndInfo={<RegisterSuggestion />}
  />
);

export default LoginScreen;
