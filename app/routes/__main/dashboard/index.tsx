/* External dependencies */
import React from 'react';
import { json } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';

/* Internal dependencies */
import {
  getProfiles,
  getCollections,
  getAudios,
} from '~/models/entity.server';
import { getSession } from '~/hooks/useSession';
import ProfileBanner from '~/components/ProfileBanner';
import EditProfile from '~/components/EditProfile';
import ClaimableWallet from '~/components/ClaimableWallet';
import UploadDirector from '~/components/UploadDirector';
import styles from '~/css/routes/__main/dashboard.css';
import UserDiscography from '~/components/UserDiscography';
import { LoaderBaseProps, ProfileLoaderData } from '../../types';
import { extractCredentials } from '~/helpers/cryptography';

export function links() {
  return [{ rel: 'stylesheet', href: styles }];
}

export const loader = async ({ request }: LoaderBaseProps) => {
  const session = await getSession(
    request.headers.get('Cookie')
  );

  const passphrase = session.get('passphrase');
  const { address } = await extractCredentials(passphrase);

  const { data: profiles } = await getProfiles({ params: { creatorAddress: address } });
  const { data: collections } = await getCollections({ params: { creatorAddress: address } });
  const { data: audios } = await getAudios({ params: { ownerAddress: address, limit: '5' } });

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
    id,
  } = useLoaderData() as ProfileLoaderData;

  return (
    <section className="screen dashboard">
      <ProfileBanner
        data={profile}
        audios={audios?.length ? audios : []}
      />
      <UserDiscography
        collections={collections?.length ? collections : []}
      />
      <UploadDirector />
      <EditProfile data={profile} />
      <ClaimableWallet address={id} audios={audios?.length ? audios : []} />
    </section>
  );
};

export default ProfileScreen;
