import React from 'react';

const ActiveSubscription = () => (
  <section className="component activeSubscription">
    <header>
      <h3>Free terial</h3>
    </header>

    <div className="listItem">
      <span className="itemOne">Price</span>
      <span className="itemTwo">Free</span>
    </div>
    <div className="line"></div>
    <div className="listItem">
      <span className="itemOne">Price</span>
      <span className="itemTwo">Free</span>
    </div>
    <div className="line"></div>

    <div className="listItem">
      <span className="itemOne">Price</span>
      <span className="itemTwo">Free</span>
    </div>
    <div className="line"></div>

    <div className="listItem">
      <span className="itemOne">Price</span>
      <span className="itemTwo">Free</span>
    </div>

    <section className="component footer discarded">
      <div className="content">
        <figure className="">
          <img className="svg" src="/images/letter.svg" alt="Muzikie" />
        </figure>
        <p className="spread">
          <span>Spread the word of Muzikie </span>
          <br />
               let others enjoy free music too
        </p>
        <button className="shareLink">
          <span>Share link</span>
        </button>
      </div>
    </section>
  </section>
);

export default ActiveSubscription;
