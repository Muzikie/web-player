import React from 'react';

// internal import
import PopularAudios from '../PopularAudios';
import { API_URLS, FILES } from '~/configs';
import Image from '../common/Image';
import { ProfileAddress } from './types';

const ProfileBanner = ({ data, audios }: ProfileAddress) => {
  const { creatorAddress, profileID, name } = data;

  return (
    <section className="component profileBanner">
      <figure className="bannerWrapper">
        <Image
          className="photo"
          src={`${API_URLS.STORAGE}/${profileID}${FILES.profile.secondary}.jpg`}
          placeHolder="/images/artist.jpg"
          alt={creatorAddress}
        />
      </figure>
      <header>
        <h2>{name || creatorAddress}</h2>
      </header>
      <PopularAudios audios={audios} />
    </section>
  );
};

export default ProfileBanner;
