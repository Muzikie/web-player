import React from 'react';

// internal import
import { API_URLS, FILES } from '~/configs'
import Image from '../common/Image'
import PopularAudios from '../PopularAudios'
import { ProfileAddress } from './types'

const ProfileBanner = ({ data, audios } : ProfileAddress) => {
  const { creatorAddress, profileID, name } = data

  return (
    <section className="component profileBanner">
      <figure className="bannerWrapper">
        <Image 
          className="photo"
          src={`${API_URLS.STREAMER}/${profileID}-${FILES.profile}.jpg`}
          placeHolder="/images/artist.jpg"
          alt={creatorAddress}
        />
      </figure>
      <header>
        <h2>{ name ?? creatorAddress }</h2>
      </header>
      <PopularAudios audios={audios} />
    </section>
  );
};

export default ProfileBanner;
