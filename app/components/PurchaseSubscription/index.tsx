import React, { useState } from 'react';
import { useSubscriptions } from '~/hooks/useSubscriptions';
import Modal from '~/components/Modal';
import Icon from '~/components/common/Icon';
import { PrimaryButton } from '~/components/common/Button';
import { TextLink } from '~/components/common/Link';
import './purchase.css'

const PurchaseSubscription = () => {

  return (
    <>
      <section className="component purchase">
        <div className="description">
          <div className="title">
            <figure>
              <img src="/images/letter.svg" alt="SVG as an image" />
            </figure>
            <h4>
              Share the word of Muzikie and receive free sbuscription
            </h4>
          </div>
          <p>
            Muzikie has embarked on an exciting mission to bring transparency and fairness to the music distribution industry.
            We are excited to build it, and we need your support and feedback on this mission.
          </p>
        </div>
      </section>
      <Modal className='component offer' theme="light" notStickyInMobile>
        <div className="sidebar">
          <span>Free 6K</span>
          <span>6000 audio streams</span>
          <span>To our new users</span>
          <PrimaryButton className={`subscribeButton ${'disabled'}`}>Subscribe now</PrimaryButton>
        </div>
        <div className="mainOffer">
          <div className="description">
            Looking for music streaming platform where music is not treated as a commodity?
            Support your favorite musicians by joining a fair,
            transparent and intuitive Platform with a futuristic economy.
          </div>
          <div className="social">
            <ul>
              <li>
                <img src="/images/checkmark.svg" alt="SVG as an image" />
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
        </div>
      </ Modal>
    </>
  )
};

export default PurchaseSubscription;

