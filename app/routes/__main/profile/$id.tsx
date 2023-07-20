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

export const loader = async ({ params }: profileLoaderProps) => {
  invariant(params.id, 'Expected params.id');

  const { data: profiles } = await getProfiles({ params: { creatorAddress: params.id } });
  const { data: collections } = await getCollections({ params: { creatorAddress: params.id } });
  const { data: audios } = await getAudios({ params: { ownerAddress: params.id, limit: '5' } });

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
    creatorAddress: params.id,
  };

  const profile = profiles?.length > 0 ? profiles[0] : defaultProfile;

  return json<ProfileLoaderData>({
    profile,
    collections,
    audios,
    id: params.id,
  });
};

const ProfileScreen = () => {
  const {
    profile,
    collections,
    audios,
    id,
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
      <WalletDetails address={id} audios={audios?.length ? audios : []} />
    </section>
  );
};

export default ProfileScreen;
