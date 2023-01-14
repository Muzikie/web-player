import React, { useState } from 'react';
import Modal from '~/components/Modal';
import Icon from '~/components/common/Icon';
import { PrimaryButton } from '~/components/common/Button';
import { TextLink } from '~/components/common/Link';
import { usePurchaseSubscription } from '~/hooks/useSubscriptions';
import './purchase.css'

const PurchaseSubscription = () => {
  const [status, setStatus] = useState('READY');
  const { purchase } = usePurchaseSubscription();

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
        </div>
      </section>
      <Modal className='component offer' theme="light" notStickyInMobile>
        <aside className="sidebar">
          <span>Free 6K</span>
          <span>6000 audio streams</span>
          <span>To our new users</span>
          <PrimaryButton
            className="subscribeButton"
            disabled={status !== 'READY'}
            onClick={onSubmit}
          >
            Subscribe now
          </PrimaryButton>
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
                <TextLink
                  className="checked"
                  theme="dark"
                  title="Follow Muzikie on Twitter"
                  to="/twitter"
                />
              </li>
              <li>
                <Icon name='twitter1' />
                <TextLink
                  className="notChecked"
                  theme="dark"
                  title="Share a tweet about Muzikie"
                  to="/twitter"
                />
              </li>
              <li>
                <Icon name='telegram' />
                <TextLink
                  className="notChecked"
                  theme="dark"
                  title="Join the Telegram channel"
                  to="/telegram"
                />
              </li>
            </ul>
          </div>
        </main>
      </ Modal>
    </>
  );
};

export default PurchaseSubscription;

