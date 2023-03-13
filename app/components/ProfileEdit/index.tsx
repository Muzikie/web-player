import React, { useState } from 'react';
import { Input, FileInput, Textarea } from '~/components/common/Input';
import { PrimaryButton } from '~/components/common/Button';
import './profileEdit.css';
import {
  SocialAccountPlatform,
  SocialAccount,
} from '~/configs';
import { ProfileEditProps } from '../ProfileDetails/types';

const ProfileEdit = ({ setShowForm, onSubmit }: ProfileEditProps) => {
  const platforms = Object.keys(SocialAccountPlatform);
  const initialValue = [
    { platform: SocialAccountPlatform.Twitter, username: '' },
    { platform: SocialAccountPlatform.Instagram, username: '' },
    { platform: SocialAccountPlatform.Youtube, username: '' },
  ];
  const [nickName, setNickName] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [socialAccounts, setSocialAccounts] = useState<SocialAccount[]>(initialValue);
  const [uploadBanner, setUploadBanner] = useState<FileList | null>();
  const [uploadAvatar, setUploadAvatar] = useState<FileList | null>(null);

  return (
    <form className="component profileEdit">
      <fieldset>
        <div>
          {/* <figure className="profileAvatar">
            <Image
              src={`${API_URLS.STREAMER}/${profile.creatorAddress}-${FILES.profile}.jpg`}
              alt={profile.name}
              placeHolder="/images/artist.jpg"
            />
          </figure> */}
          <FileInput
            icon="file"
            name="uploadBanner"
            accept='.png,.jpg,.jpeg'
            multiple={false}
            title="Upload banner image"
            className="fileInput"
          />
        </div>
        <FileInput
          icon="file"
          name="uploadAvatar"
          accept='.png,.jpg,.jpeg'
          multiple={false}
          title="Upload avatar image"
          className="fileInput"
        />
        <Input
          value={nickName}
          name="nickName"
          placeholder="Enter name"
          type="text"
        />
        <Textarea
          value={description}
          name="description"
          placeholder="Describe yourself"
          className="descriptionInput"
        />
        <Input
          value={socialAccounts[2].username}
          name="youtube"
          placeholder="Youtube channel"
          type="text"
        />
        <Input
          value={socialAccounts[0].username}
          name="twitter"
          placeholder="Twitter username"
          type="text"
        />
        <Input
          value={socialAccounts[1].username}
          name="instagram"
          placeholder="Instagram username"
          type="text"
        />
      </fieldset>
      <PrimaryButton
        onClick={() => onSubmit({ socialAccounts, description })}
        disabled={true}
        type="button"
      >
        Save
        <span className='showFee'>(Fee: 0.00012 MZK)</span>
      </PrimaryButton>
      <PrimaryButton onClick={() => setShowForm(false)} className="white" disabled={false} type="button">
        Cancel
      </PrimaryButton>
    </form>
  )
}

export default ProfileEdit;
