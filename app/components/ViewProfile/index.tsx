import React from 'react';

/* Internal dependencies */
import Image from '~/components/common/Image';
import Icon from '~/components/common/Icon';
import {
  Profile,
  SocialAccountPlatform,
  API_URLS,
  SUFFIXES,
  socialPlatformNames,
} from '~/configs';
import { truncateAddress } from '~/helpers/formatters';
import { ProfileEditProps, Placeholder } from './types';
import './profileDetails.css';

const merge = (data: Profile, placeholder: Placeholder) => {
  const profile = { ...placeholder, ...data };
  profile.socialAccounts = placeholder.socialAccounts.map(({ platform }) => ({
    platform,
    username: data.socialAccounts?.find(item => item.platform === platform)?.username ?? '',
  }));
  return profile;
};

const ViewProfile = ({ data }: ProfileEditProps) => {
  const placeholder: Placeholder = {
    name: 'Artist Name',
    description: 'Here artists can introduce themselves.',
    socialAccounts: [
      {
        username: '',
        platform: SocialAccountPlatform.Instagram
      },
      {
        username: '',
        platform: SocialAccountPlatform.Twitter,
      },
      {
        username: '',
        platform: SocialAccountPlatform.Youtube,
      }
    ],
  };
  const profile = merge(data, placeholder);

  return (
    <section className="component viewProfile">
      <section className="viewWrapper">
        <figure className="profileAvatar">
          <Image
            src={`${API_URLS.STORAGE}/${profile.profileID}${SUFFIXES.profile.primary}.jpg`}
            alt={profile.name || profile.creatorAddress}
            placeHolder="/images/artist.jpg"
          />
        </figure>

        <header className="profileName">
          <h2>{profile.name || truncateAddress(profile.creatorAddress)}</h2>
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
        </div>
        <figure className="bubblesPattern">
          <img src="/images/bubbles.svg" />
        </figure>
      </section>
    </section>
  );
};

export default ViewProfile;
