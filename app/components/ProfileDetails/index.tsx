import React, { useState } from 'react';

/* Internal dependencies */
import { Profile, SocialAccountPlatform } from '~/configs';
import { Placeholder, ProfileDetailsProps, ProfileState } from './types';
import EditProfile from './EditProfile';
import ViewProfile from './ViewProfile';

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
      {showForm
        ? <EditProfile setShowForm={setShowForm} profile={profile} />
        : <ViewProfile setShowForm={setShowForm} profile={profile} />
      }
    </section>
  );
};

export default ProfileDetails;
