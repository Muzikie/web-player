import React from 'react';
import {useActiveSubscription} from '~/hooks/useSubscriptions';
import {PrimaryButton} from '../common/Button';
import Modal from '../Modal';
import {PartialView} from '../PartialView';

const List = [
  {title: 'Price', content: 'Free'},
  {title: 'Value to spend', content: '30 MZK'},
  {title: 'Consumed', content: '10.12330 MZK'},
  {title: 'Members', content: 'I user'}
];

const Form = () => {
  return (
    <div className="listContainer">
      <h3>Free terial</h3>

      {List.map(({title, content}) => (
        <>
          <ul className="listItem">
            <li className="itemOne">
              <span>{title}</span>
            </li>{' '}
            <li className="itemTwo">
              <span>{content}</span>
            </li>
          </ul>
          <div className="line"></div>
        </>
      ))}
    </div>
  );
};
const ActiveSubscription = () => {
  const {subscription} = useActiveSubscription();

  console.log('sub', subscription);
  return (
    <section className="component activeSubscription">
      <Form />
      <Modal>
        <div className="wrapper">
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
      </Modal>
    </section>
  );
};

export default ActiveSubscription;
