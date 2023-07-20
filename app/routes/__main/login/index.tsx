/* External dependencies */
import React from 'react';
import { json, redirect } from '@remix-run/node';

/* Internal dependencies */
import LoginForm from '~/components/LoginForm';
import RegisterSuggestion from '~/components/RegisterSuggestion';
import { getSession, commitSession } from '~/hooks/useSession';
import { PartialView } from '~/components/PartialView';
import styles from '~/css/routes/__main/login.css';
import { ROUTES } from '~/routes/routes';
import { LoaderBaseProps } from '~/routes/types';

export function links() {
  return [{ rel: 'stylesheet', href: styles }];
}

export async function loader({ request }: LoaderBaseProps) {
  const session = await getSession(
    request.headers.get('Cookie')
  );

  const passphrase = session.get('passphrase');
  if (passphrase?.length > 0) {
    return redirect(ROUTES.HOME.location);
  }

  return json({});
}

export async function action({ request }: LoaderBaseProps) {
  const session = await getSession(
    request.headers.get('Cookie')
  );
  const formData = await request.formData();
  const passphrase = formData.get('passphrase') as string;

  session.set('passphrase', passphrase);

  // Redirect back to the agreement page.
  return redirect(ROUTES.AGREEMENT.location, {
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
