import React from 'react';

// internal
import { PrimaryButton } from '../common/Button';
import Icon from '../common/Icon';
import { Link } from '../common/Link';

const ProfileDetails = () => {
  return (
    <section className='component profileDetails'>
      <figure>
        <img src="/images/artist.jpg" alt='' />
      </figure>
      <header>
        <h2>Artist Name</h2>
      </header>
      <section className="bioContainer">
        <h4>BIO</h4>
        <p>
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Doloribus, labore iusto
          necessitatibus adipisci pariatur ratione? Aperiam possimus debitis assumenda culpa optio
          ipsa maiores at voluptatum tenetur, nesciunt fuga praesentium aut!
        </p>
      </section>
      <div className="social">
        <ul>
          <li>
            <Link theme="dark" to="/youtube">
              <div className='iconBackground'>
                <Icon name='youtube' />
              </div>
              <span>Not yet</span>
            </Link>
          </li>
          <li>
            <Link theme='dark' to="/twitter">
              <div className="iconBackground">
                <Icon name="twitter" />
              </div>
              <span>Not yet</span>
            </Link>
          </li>
          <li>
            <Link theme="dark" to="/instagram">
              <div className="iconBackground">
                <Icon name="instagram" />
              </div>
              <span>Not yet</span>
            </Link>
          </li>
        </ul>
        <PrimaryButton onClick={() => null} className="white" disabled={false} type="button">
        Edit
        </PrimaryButton>
      </div>
    </section>
  );
};

export default ProfileDetails;
