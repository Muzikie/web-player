/* External dependencies */
import React from 'react';
import { json } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import invariant from 'tiny-invariant';

/* Internal dependencies */
import {
  getProfiles,
  getCollections,
  getAudios,
} from '~/models/entity.server';
import { getSession } from '~/hooks/useSession';
import ProfileBanner from '~/components/ProfileBanner';
import ProfileDetails from '~/components/ProfileDetails';
import WalletDetails from '~/components/WalletDetails';
import styles from '~/css/routes/__main/profile.css';
import UserDiscography from '~/components/UserDiscography';
import { profileLoaderProps, ProfileLoaderData } from '../../types';

export function links() {
  return [{ rel: 'stylesheet', href: styles }];
}

export const loader = async ({ params, request }: profileLoaderProps) => {
  invariant(params.id, 'Expected params.id');
  const session = await getSession(
    request.headers.get('Cookie')
  );

  const address = params.id === 'me' ? session.get('address') : params.id;
  const { data: profiles } = await getProfiles({ params: { creatorAddress: address } });
  const { data: collections } = await getCollections({ params: { creatorAddress: address } });
  const { data: audios } = await getAudios({ params: { creatorAddress: address } });

  const defaultProfile = {
    name: '',
    nickName: '',
    description: '',
    avatarHash: '',
    avatarSignature: '',
    bannerHash: '',
    bannerSignature: '',
    socialAccounts: [],
    profileID: '',
    creatorAddress: address,
  };

  const profile = profiles?.length > 0 ? profiles[0] : defaultProfile;

  return json<ProfileLoaderData>({
    profile,
    collections,
    audios,
    id: address,
  });
};

const ProfileScreen = () => {
  const {
    profile,
    collections,
    audios,
  } = useLoaderData() as ProfileLoaderData;

  return (
    <section className="screen profile">
      <ProfileBanner
        data={profile}
        audios={audios?.length ? audios : []}
      />
      <UserDiscography
        collections={collections?.length ? collections : []}
        profile={profile}
      />
      <ProfileDetails data={profile} />
      <WalletDetails />
    </section>
  );
};

export default ProfileScreen;
