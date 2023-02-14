import React from 'react';

// internal import
import { API_URLS, FILES } from '~/configs'
import Image from '../common/Image'
import { ProfileAddress } from './types'

const ProfileBanner = ({data} : ProfileAddress) => {
  const {creatorAddress} = data

  return (
    <section className="component profileBanner">
      <header>
        <figure className="bannerWrapper">
          <Image 
            className="photo"
            src={`${API_URLS.STREAMER}/${creatorAddress}-${FILES.profile}.jpg`}
            placeHolder="/images/selena-gomez 1.png"
            alt={creatorAddress}/> 
        </figure>
        <div>
          <h3>{ creatorAddress }</h3>
        </div>
      </header>
    </section>
  );
};

export default ProfileBanner;
