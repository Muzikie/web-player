/* External dependencies */
import React, { useEffect, useContext } from 'react';
import { Outlet } from '@remix-run/react';
import { redirect } from '@remix-run/node';
import { getSession } from '~/hooks/useSession';

/* Internal dependencies */
import { PlayerContext } from '~/context/playerContext/playerContextProvider';
import styles from '~/css/routes/__main/subscription.css';
import { Tabs } from '~/components/common/Tabs';
import { useActiveSubscription } from '~/hooks/useSubscriptions';
import { ROUTES } from '~/routes/routes';

export function links() {
  return [{ rel: 'stylesheet', href: styles }];
}

export const loader = async ({ request }: any) => {
  const session = await getSession(
    request.headers.get('Cookie')
  );
  const agreement = session.get('agreement');
  const address = session.get('address');
  if (!address) {
    // redirect users to home page when users are logout
    return redirect('/')
  }
  if (!agreement && address) {
    // redirect users to agreement page when the agreement cookie is not set
    return redirect('/agreement')
  }
  return session;
}

const SubscriptionScreen = () => {
  const { subscription } = useActiveSubscription();
  const { setCurrent } = useContext(PlayerContext);

  useEffect(() => {
    if (!subscription) {
      setCurrent(null);
    }
  }, [subscription]);

  return (
    <section className="screen subscription">
      <header className="tabsHeader">
        <Tabs
          items={[
            { title: 'Active Subscription', to: ROUTES.SUBSCRIPTION_ACTIVE },
            { title: 'Purchase', to: ROUTES.SUBSCRIPTION_PURCHASE }
          ]}
        />
      </header>
      <Outlet />
    </section>
  );
};

export default SubscriptionScreen;
