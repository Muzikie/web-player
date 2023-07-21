/* External dependencies */
import React from 'react';
import { redirect } from '@remix-run/node';
import { useFetcher } from '@remix-run/react';

/* Internal dependencies */
import { PartialView } from '~/components/PartialView';
import { SecretKey } from '~/components/SecretKey';
import Icon from '~/components/common/Icon';
import styles from '~/css/routes/__main/register.css';
import { PrimaryButton } from '~/components/common/Button';
import { getSession, destroySession } from '~/hooks/useSession';
import { LoaderBaseProps } from '../../types';
import { ROUTES } from '~/routes/routes';

export function links() {
  return [{ rel: 'stylesheet', href: styles }];
}
export async function action({ request }: LoaderBaseProps) {
  const session = await getSession(
    request.headers.get('Cookie')
  );
  return redirect(ROUTES.LOGIN.location, {
    headers: {
      'Set-Cookie': await destroySession(session),
    },
  });
}

const SecretKeyGenerator = () => (
  <section className="secretKeyGenerator">
    <h4>Before you logout, take a moment and back up your secret key.</h4>
    <SecretKey />
  </section>
);

const ActionAndInfo = () => {
  const fetcher = useFetcher();

  return (
    <section className="actionAndInfo">
      <Icon name="info" className="warningIcon" />
      <h2>There is no Forgot<br />password option</h2>
      <h3>If you lose your secret key, no one<br />can restore it. Keep it safe!</h3>
      <fetcher.Form method="post">
        <PrimaryButton
          theme="white"
          type="submit"
          className="logoutButton"
        >
          Logout
        </PrimaryButton>
      </fetcher.Form>
    </section>
  );
};

const LogoutScreen = () => (
  <PartialView
    title="Logging out"
    className="register"
    form={<SecretKeyGenerator />}
    actionAndInfo={<ActionAndInfo />}
  />
);

export default LogoutScreen;
