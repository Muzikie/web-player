import React from 'react';

import { NoSubscriptionProps } from './types';

const NoSubscription = ({
  title,
  content,
}: NoSubscriptionProps) => (
  <section className="component noSubscription">
    <div className="wrapper">
      <figure>
        <img
          src="/images/no-result.svg"
          alt="No result icon"
        />
      </figure>
      <header>
        <h3>{title}</h3>
        <div className='content'>{content}</div>
      </header>
    </div>
  </section>
);

export default NoSubscription;
