/* External dependencies */
import React from 'react';
import { redirect } from '@remix-run/node';
import { useFetcher } from '@remix-run/react';

/* Internal dependencies */
import { PrimaryButton } from '~/components/common/Button';
import { getSession, destroySession } from '~/hooks/useSession';
import { LoaderBaseProps } from '../../types';
import styles from '~/css/routes/__main/login.css';
import { ROUTES } from '~/routes/routes';

export function links() {
  return [{ rel: 'stylesheet', href: styles }];
}
export async function action({ request }: LoaderBaseProps) {
  const session = await getSession(
    request.headers.get('Cookie')
  );
  return redirect(ROUTES.LOGIN, {
    headers: {
      'Set-Cookie': await destroySession(session),
    },
  });
}

const LogoutScreen = () => {
  const fetcher = useFetcher();

  return (
    <section className="screen profile">
      <span>Before logging out, make sure you have backed up your secret key</span>
      <fetcher.Form method="post">
        <PrimaryButton
          type="submit"
          className="logoutButton"
        >
          Logout
        </PrimaryButton>
      </fetcher.Form>
    </section>
  );
};

export default LogoutScreen;
