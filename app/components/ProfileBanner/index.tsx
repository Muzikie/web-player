import React from 'react';
import { API_URLS, FILES } from '~/configs'
import { ProfileAddress } from './types'

const ProfileBanner = ({data} : ProfileAddress) => {
  const {creatorAddress} = data
  return (
    <section className="component profileSummary">
    <figure className="photo">
      <img src={`${API_URLS.STREAMER}/${creatorAddress}-${FILES.profile}.jpg`} alt={creatorAddress}/>
    </figure>
    <header>
      <h1>{ creatorAddress }</h1>
    </header>
  </section>
  );
};

export default ProfileBanner;
