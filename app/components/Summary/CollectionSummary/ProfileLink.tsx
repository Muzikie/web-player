import React from 'react';

/* Internal dependencies */
import { Link } from '~/components/common/Link';
import Image from '~/components/common/Image'
import { API_URLS } from '~/configs';
import { truncateAddress } from '~/helpers/formatters';
import { ROUTES } from '~/routes/routes';
import { ProfileLinkProps } from './types';

const ProfileLink = ({ profile }: ProfileLinkProps) => (
  <Link to={ROUTES.PROFILE.replace(':id', profile.creatorAddress)} className="profile">
    <figure>
      <Image
        src={`${API_URLS.STREAMER}/${profile.profileID}-avatar.jpg`}
        placeHolder="/images/artist.jpg"
      />
    </figure>
    <h4>{profile.name || truncateAddress(profile.creatorAddress)}</h4>
  </Link>
);

export default ProfileLink;
