import { Profile } from '~/configs';

export type Placeholder = Omit<Profile, 'nickName' | 'profileID' | 'avatarHash' | 'avatarSignature' | 'bannerHash' | 'bannerSignature' | 'creatorAddress'>;
export interface ProfileDetailsProps {
  data: Profile;
}
export type ProfileState = boolean;

export interface ProfileEditProps {
  data: Profile
}
