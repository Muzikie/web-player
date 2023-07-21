import React from 'react';

// internal import
import PopularAudios from '../PopularAudios';
import { API_URLS, SUFFIXES } from '~/configs';
import Image from '../common/Image';
import { truncateAddress } from '~/helpers/formatters';
import { ProfileAddress } from './types';

const ProfileBanner = ({ data, audios }: ProfileAddress) => {
  const { creatorAddress, profileID, name } = data;

  return (
    <section className="component profileBanner">
      <figure className="bannerWrapper">
        <Image
          className="photo"
          src={`${API_URLS.STORAGE}/${profileID}${SUFFIXES.profile.secondary}.jpg`}
          placeHolder="/images/artist.jpg"
          alt={creatorAddress}
        />
      </figure>
      <header>
        <h2>{name || truncateAddress(creatorAddress)}</h2>
      </header>
      {audios.length > 0 && <PopularAudios audios={audios} />}
    </section>
  );
};

export default ProfileBanner;
