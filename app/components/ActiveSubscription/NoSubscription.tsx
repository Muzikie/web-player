import React from 'react';

const NoSubscription = ({
  title,
  content,
}) => (
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
        <p>{content}</p>
      </header>
    </div>
  </section>
);

export default NoSubscription;
