import { Profile } from '~/configs';

export type Placeholder = Omit<Profile, 'nickName' | 'profileID' | 'avatarHash' | 'avatarSignature' | 'bannerHash' | 'bannerSignature' | 'creatorAddress'>;
export type ProfileDetailsProps = {
  data: Profile;
};
