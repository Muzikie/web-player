import { Profile } from '~/configs';

export type ProfileEditProps = {
  profile: Profile
  setShowForm: (value: boolean) => void;
}
