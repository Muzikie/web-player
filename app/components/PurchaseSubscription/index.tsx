import React, { useState, useEffect } from 'react';
/* Internal dependencies */
import Modal from '~/components/Modal';
import Icon from '~/components/common/Icon';
import { PrimaryButton } from '~/components/common/Button';
import { Link } from '~/components/common/Link';
import { useActiveSubscription, usePurchaseSubscription, useSubscriptions } from '~/hooks/useSubscriptions';
import { useAccount } from '~/hooks/useAccount/useAccount';

const PurchaseSubscription = () => {
  const [status, setStatus] = useState('READY');
  const { purchase } = usePurchaseSubscription();
  const { subscriptionStatus } = useActiveSubscription();
  const { subscription } = useActiveSubscription();

  const { info, updateAccount } = useAccount();
  const fn = async () => {
    // const value = await updateAccount()
    // console.log({ value })
  }


  // useEffect(() => {
  //   console.log(info)
  // }, [info])
  // info.balances[0].availableBalance
  useEffect(() => {
    if (info.address.length > 0) {
      fn()
    }
  }, [info.address])


  const onSubmit = async () => {
    setStatus('PENDING');
    const feedback = await purchase();
    setStatus(feedback);
  };

  return (
    <>
      <section className="component purchase">
        <div className="description">
          <header className="title">
            <figure>
              <img src="/images/letter.svg" alt="Letter icon" />
            </figure>
            <h4>
              Share the word of Muzikie and receive free sbuscription
            </h4>
          </header>
          <p>
            Muzikie has embarked on an exciting mission to bring transparency and fairness to the music distribution industry.
            We are excited to build it, and we need your support and feedback on this mission.
          </p>
          {(subscription && info.balances.length > 0) &&
            BigInt(subscription.price) <= BigInt(info.balances[0].availableBalance) + BigInt('2000000')
            ? <div className="message error">
              you don't have enough token to purchase a subscription plan.
              Please add more token to your account to be able to purchase
              a subscription plan.
            </div> :
            <div className="message successful">Subscription has done successfully.</div>}
        </div>
      </section>
      <Modal className='component offer' theme="light" notStickyInMobile>
        <aside className="sidebar">
          <span>Free 6K</span>
          <span>6000 audio streams</span>
          <span>To our new users</span>
          {subscriptionStatus !== 'LOADING' && <PrimaryButton
            className="subscribeButton"
            disabled={status !== 'READY' || subscriptionStatus === 'SUBSCRIBED'}
            onClick={onSubmit}
          >
            {subscriptionStatus === 'SUBSCRIBED' ? 'Subscribed' : 'Subscribe now'}
          </PrimaryButton>}
        </aside>
        <main className="mainOffer">
          <div className="description">
            Looking for music streaming platform where music is not treated as a commodity?
            Support your favorite musicians by joining a fair,
            transparent and intuitive Platform with a futuristic economy.
          </div>
          <div className="social">
            <ul>
              <li>
                <img src="/images/checkmark.svg" alt="checkmark icon" />
                <Link
                  className="checked"
                  theme="dark"
                  to="/twitter"
                >
                  Follow Muzikie on Twitter
                </Link>
              </li>
              <li>
                <Icon name='twitter1' />
                <Link
                  className="notChecked"
                  theme="dark"
                  to="/twitter"
                >
                  Share a tweet about Muzikie
                </Link>
              </li>
              <li>
                <Icon name='telegram' />
                <Link
                  className="notChecked"
                  theme="dark"
                  to="/telegram"
                >
                  Join the Telegram channel
                </Link>
              </li>
            </ul>
          </div>
        </main>
      </ Modal>
    </>
  );
};

export default PurchaseSubscription;

