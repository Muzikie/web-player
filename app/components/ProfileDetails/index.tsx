import React, { useState } from 'react';

// internal
import ProfileEdit from '../ProfileEdit';
import { PrimaryButton } from '../common/Button';
import Icon from '../common/Icon';
import Image from '../common/Image';
import { Profile, SocialAccountPlatform, API_URLS, FILES } from '~/configs';
import { Placeholder, ProfileDetailsProps, ProfileState } from './types'

const platforms = [
  'instagram',
  'twitter',
  'youtube'
];

const merge = (data: Profile, placeholder: Placeholder) => {
  const profile = { ...placeholder, ...data };
  profile.socialAccounts = placeholder.socialAccounts.map(({ platform }) => ({
    platform,
    username: data.socialAccounts?.find(item => item.platform === platform)?.username ?? '',
  }));
  return profile;
};

const ProfileDetails = ({ data }: ProfileDetailsProps) => {
  const [showForm, setShowForm] = useState<ProfileState>(false);
  const placeholder: Placeholder = {
    name: 'Artist Name',
    description: 'Here artists can introduce themselves.',
    socialAccounts: [
      {
        username: '',
        platform: SocialAccountPlatform.Twitter,
      },
      {
        username: '',
        platform: SocialAccountPlatform.Instagram
      },
      {
        username: '',
        platform: SocialAccountPlatform.Youtube,
      }
    ],
  };
  const profile = merge(data, placeholder);

  return (
    <section className='component profileDetails'>
      {showForm ?
        <ProfileEdit setShowForm={setShowForm} profile={profile} />
        :
        (
          <>
            <figure className="profileAvatar">
              <Image
                src={`${API_URLS.STREAMER}/${profile.creatorAddress}-${FILES.profile}.jpg`}
                alt={profile.name}
                placeHolder="/images/artist.jpg"
              />
            </figure>

            <header className="profileName">
              <h2>{profile.name}</h2>
            </header>

            <section className="bioContainer">
              <h4>BIO</h4>
              <p>
                {profile.description}
              </p>
            </section>

            <div className="socialMediaAccounts">
              <ul>
                {
                  profile.socialAccounts.map(({ platform, username }) => (
                    <li key={platform}>
                      <a
                        href={username ? `https://${platforms[platform]}.com/${username}` : ''}
                        target="_blank"
                        rel="noreferrer"
                      >
                        <div className='iconBox'>
                          <Icon name={platforms[platform]} />
                        </div>
                        <span>{username || 'Not yet'}</span>
                      </a>
                    </li>
                  ))
                }
              </ul>
              <PrimaryButton onClick={() => setShowForm(true)} className="white" disabled={false} type="button">
                Edit
              </PrimaryButton>
            </div>
          </>
        )
      }
      <figure className="bubblesPattern">
        <img src="/images/bubbles.svg" />
      </figure>
    </section>
  );
};

export default ProfileDetails;
