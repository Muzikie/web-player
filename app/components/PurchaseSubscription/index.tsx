import React, { useState } from 'react';

/* Internal dependencies */
import Modal from '~/components/Modal';
import Icon from '~/components/common/Icon';
import { PrimaryButton } from '~/components/common/Button';
import { Link } from '~/components/common/Link';
import { usePurchaseSubscription } from '~/hooks/useSubscriptions';
import Feedback from '../Feedback';

const PurchaseSubscription = () => {
  const [feedback, setFeedback] = useState({
    error: false,
    message: '',
  });
  const { purchase } = usePurchaseSubscription();

  const onSubmit = async () => {
    setFeedback({
      error: false,
      message: 'loading',
    });
    const feedback = await purchase();
    setFeedback(feedback);
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
              Share the word of Muzikie and receive free subscription
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
            disabled={feedback.error || feedback.message !== ''}
            onClick={onSubmit}
          >
            Subscribe now
          </PrimaryButton>
          <Feedback data={feedback} />
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

