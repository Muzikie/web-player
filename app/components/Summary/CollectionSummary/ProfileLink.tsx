import React, { useEffect, useRef } from 'react';

/* Internal dependencies */
import { Link } from '~/components/common/Link';
import { API_URLS } from '~/configs';
import { truncateAddress } from '~/helpers/formatters';
import { ROUTES } from '~/routes/routes';
import { ProfileLinkProps } from './types';

const ProfileLink = ({ profile }: ProfileLinkProps) => {
  const image = useRef<HTMLImageElement>(null);

  const imageNotFound = () => {
    if (image.current) {
      image.current.src = '/images/profile.jpg';
      image.current.removeEventListener('error', imageNotFound);
    }
  };

  useEffect(() => {
    if (image.current?.naturalWidth === 0) {
      imageNotFound();
    }
  }, [profile.creatorAddress]);

  return (
    <Link to={ROUTES.PROFILE.replace(':id', profile.creatorAddress)} className="profile">
      <figure>
        <img
          ref={image}
          src={`${API_URLS.STREAMER}/${profile.creatorAddress}-avatar.jpg`}
          alt={profile.creatorAddress}
        />
      </figure>
      <h4>{profile.name || truncateAddress(profile.creatorAddress)}</h4>
    </Link>
  );
};

export default ProfileLink;
