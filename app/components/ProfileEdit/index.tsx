import React from 'react';
import { Input, FileInput, Textarea } from '~/components/common/Input';
import Image from '../common/Image';
import { PrimaryButton } from '~/components/common/Button';
import { useCreateProfile } from '~/hooks/useCreateEntity/useCreateProfile.ts';
import './profileEdit.css';
import { API_URLS, FILES } from '~/configs';
import { ProfileEditProps } from './types';

const ProfileEdit = ({ setShowForm }: ProfileEditProps) => {
  const { nickName, description, socialAccounts, onChange, broadcast, feedback, status } = useCreateProfile();

  return (
    <form className="component profileEdit">
      <fieldset>
        <div>
          <figure className="profileEditBanner">
            <Image
              src={`${API_URLS.STREAMER}/${profile.creatorAddress}-${FILES.profile}.jpg`}
              alt={profile.creatorAddress}
              placeHolder="/images/artist.jpg"
            />
          </figure>
          <FileInput
            icon="file"
            name="uploadBanner"
            accept='.png,.jpg,.jpeg'
            multiple={false}
            title="Click to update banner"
            className="fileInput"
            onChange={onChange}
          />
        </div>
        <div>
          <figure className="profileEditAvatar">
            <Image
              src={`${API_URLS.STREAMER}/${profile.creatorAddress}-${FILES.profile}.jpg`}
              alt={profile.creatorAddress}
              placeHolder="/images/artist.jpg"
            />
          </figure>
          <FileInput
            icon="file"
            name="uploadAvatar"
            accept='.png,.jpg,.jpeg'
            multiple={false}
            title="Click to update Avatar"
            className="fileInput"
            onChange={onChange}
          />
        </div>
        <Input
          value={nickName}
          name="nickName"
          placeholder="Enter name"
          type="text"
          onChange={onChange}
        />
        <Textarea
          value={description}
          name="description"
          placeholder="Describe yourself"
          className="descriptionInput"
          onChange={onChange}
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
          onChange={onChange}
        />
        <Input
          value={socialAccounts[1].username}
          name="instagram"
          placeholder="Instagram username"
          type="text"
          onChange={onChange}
        />
      </fieldset>
      <PrimaryButton
        onClick={broadcast}
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
