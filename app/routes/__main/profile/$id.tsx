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
import { getSession } from '~/hooks/useSession';
import ProfileBanner from '~/components/ProfileBanner';
import ProfileDetails from '~/components/ProfileDetails';
import WalletDetails from '~/components/WalletDetails';
import styles from '~/css/routes/__main/profile.css';
import UserDiscography from '~/components/UserDiscography';
import { redirect } from '@remix-run/node';
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
  const profile = await getProfile(address);
  const collections = await getProfileCollections(address);
  const audios = await getProfileAudios(address, { limit: 4 });
  const agreement = session.get('agreement');

  if (!address) {
    // redirect users to home page when users are logout
    return redirect('/')
  }
  if (!agreement && address) {
    // redirect users to agreement page when the agreement cookie is not set
    return redirect('/agreement')
  }

  if (!profile) {
    throw new Response('Not Found', { status: 404 });
  }

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
    id,
  } = useLoaderData() as ProfileLoaderData;

  return (
    <section className="screen profile">
      <ProfileBanner data={profile} audios={audios} />
      <UserDiscography collections={collections} audios={audios} />
      <ProfileDetails data={profile} />
      <WalletDetails address={id} />
    </section>
  );
};

export default ProfileScreen;
