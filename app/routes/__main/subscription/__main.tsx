/* External dependencies */
import React, { useEffect, useContext } from 'react';
import { Outlet } from '@remix-run/react';
/* Internal dependencies */
import { PlayerContext } from '~/context/playerContext/playerContextProvider';
import styles from '~/css/routes/__main/subscription.css';
import { Tabs } from '~/components/common/Tabs';
import { useActiveSubscription } from '~/hooks/useSubscriptions';
import { ROUTES } from '~/routes/routes';

export function links() {
  return [{ rel: 'stylesheet', href: styles }];
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
            { title: 'Active Subscription', to: ROUTES.SUBSCRIPTION_ACTIVE.location },
            { title: 'Purchase', to: ROUTES.SUBSCRIPTION_PURCHASE.location }
          ]}
        />
      </header>
      <Outlet />
    </section>
  );
};

export default SubscriptionScreen;
