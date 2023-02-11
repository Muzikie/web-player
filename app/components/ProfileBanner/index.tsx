import React from 'react';
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
            placeHolder="/images/artist.jpg"
            alt={creatorAddress}/> 
        </figure>
        <h1>{ creatorAddress }</h1>
      </header>
    </section>
  );
  }

export default ProfileBanner;
