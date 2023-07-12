import React from 'react';

/* Internal dependencies */
import Image from '~/components/common/Image';
import Icon from '~/components/common/Icon';
import { PrimaryButton } from '~/components/common/Button';
import { useAccount } from '~/hooks/useAccount/useAccount';
import { API_URLS, FILES, socialPlatformNames } from '~/configs';
import { ProfileEditProps } from './types';
import './profileDetails.css';

const ViewProfile = ({ profile, setShowForm }: ProfileEditProps) => {
  const { info } = useAccount();
  return (
    <section className="component viewProfile ">
      <figure className="profileAvatar">
        <Image
          src={`${API_URLS.STORAGE}/${profile.profileID}${FILES.profile.primary}.jpg`}
          alt={profile.name || profile.creatorAddress}
          placeHolder="/images/artist.jpg"
        />
      </figure>

      <header className="profileName">
        <h2>{profile.name || profile.creatorAddress}</h2>
      </header>

      <section className="bioContainer">
        <h4>Bio</h4>
        <p>
          {profile.description || 'Here artists can introduce themselves.'}
        </p>
      </section>

      <div className="socialMediaAccounts">
        <ul>
          {
            profile.socialAccounts.map(({ platform, username }) => (
              <li key={platform}>
                <a
                  href={username ? `https://${socialPlatformNames[platform]}.com/${username}` : ''}
                  target="_blank"
                  rel="noreferrer"
                >
                  <div className='iconBox'>
                    <Icon name={socialPlatformNames[platform]} />
                  </div>
                  <span>{username || 'Not set'}</span>
                </a>
              </li>
            ))
          }
        </ul>
        {
          profile.creatorAddress === info.address
            ? (
              <PrimaryButton
                onClick={() => setShowForm(true)}
                className="white" disabled={false}
                type="button"
              >
                Edit
              </PrimaryButton>
            )
            : null
        }
      </div>
      <figure className="bubblesPattern">
        <img src="/images/bubbles.svg" />
      </figure>
    </section>
  );
};

export default ViewProfile;
