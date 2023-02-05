import React, { useEffect, useRef } from 'react';

/* Internal dependencies */
import { Link } from '~/components/common/Link';
import { API_URLS } from '~/configs';
import { truncateAddress } from '~/helpers/formatters';
import { ArtistLinkProps } from './types';

const ArtistLink = ({ artist }: ArtistLinkProps) => {
  const image = useRef<HTMLImageElement>(null);

  const imageNotFound = () => {
    if (image.current) {
      image.current.src = '/images/artist.jpg';
      image.current.removeEventListener('error', imageNotFound);
    }
  };

  useEffect(() => {
    if (image.current?.naturalWidth === 0) {
      imageNotFound();
    }
  }, [artist.creatorAddress]);

  return (
    <Link to={`/artist/${artist.creatorAddress}`} className="artist">
      <figure>
        <img
          ref={image}
          src={`${API_URLS.STREAMER}/${artist.creatorAddress}-avatar.jpg`}
          alt={artist.creatorAddress}
        />
      </figure>
      <h4>{artist.name || truncateAddress(artist.creatorAddress)}</h4>
    </Link>
  );
};

export default ArtistLink;
