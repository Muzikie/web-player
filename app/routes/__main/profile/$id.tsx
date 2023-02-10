/* External dependencies */
import React from 'react';
import { json } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import invariant from 'tiny-invariant';

/* Internal dependencies */
import {
  getProfile,
  getProfileCollections,
  getProfileAudios,
} from '~/models/entity.server';
import ProfileBanner from '~/components/ProfileBanner';
import ProfileDetails from '~/components/ProfileDetails';
import PopularAudios from '~/components/PopularAudios';
import WalletDetails from '~/components/WalletDetails';
import styles from '~/css/routes/__main/profile.css';
import { profileLoaderProps, ProfileLoaderData } from '../../types';
import Discography from '../upload/__main/discography';

export function links() {
  return [{ rel: 'stylesheet', href: styles }];
}

export const loader = async ({ params }: profileLoaderProps) => {
  invariant(params.id, 'Expected params.id');

  const profile = await getProfile(params.id);
  const collections = await getProfileCollections(params.id);
  const audios = await getProfileAudios(params.id);

  if (!profile) {
    throw new Response('Not Found', { status: 404 });
  }

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
      <ProfileBanner data={profile} />
      <PopularAudios audios={audios}  />
      <Discography collections={collections} />
      <ProfileDetails data={profile} />
      <WalletDetails address={id} />
    </section>
  );
};

export default ProfileScreen;
