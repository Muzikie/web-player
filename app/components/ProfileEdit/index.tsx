import React from 'react';

import { Input, FileInput, Textarea } from '~/components/common/Input';
import { ValidationStatus, useCreateProfile } from '~/hooks/useCreateEntity';
import Image from '../common/Image';
import { PrimaryButton } from '~/components/common/Button';
import Feedback from '~/components/Feedback';
import './profileEdit.css';
import { API_URLS, FILES, socialPlatformNames } from '~/configs';
import { ProfileEditProps } from './types';
import { useAccount } from '~/hooks/useAccount/useAccount';

const ProfileEdit = ({ setShowForm }: ProfileEditProps) => {
  const {
    name,
    nickName,
    description,
    socialAccounts,
    onChange,
    signAndBroadcast,
    formValidity,
    broadcastStatus,
  } = useCreateProfile();
  const { info } = useAccount();

  return (
    <form className="component profileEdit">
      <fieldset>
        <div>
          <figure className="profileEditBanner">
            <Image
              src={`${API_URLS.STREAMER}/${info.address}-${FILES.profile}.jpg`}
              alt={info.address}
              placeHolder="/images/artist.jpg"
            />
          </figure>
          <FileInput
            icon="file"
            name="banner"
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
              src={`${API_URLS.STREAMER}/${info.address}-${FILES.profile}.jpg`}
              alt={info.address}
              placeHolder="/images/artist.jpg"
            />
          </figure>
          <FileInput
            icon="file"
            name="avatar"
            accept='.png,.jpg,.jpeg'
            multiple={false}
            title="Click to update Avatar"
            className="fileInput"
            onChange={onChange}
          />
        </div>
        <Input
          value={name}
          name="name"
          placeholder="Enter name"
          type="text"
          onChange={onChange}
        />
        <Input
          value={nickName}
          name="nickName"
          placeholder="Enter nickname"
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
        {socialAccounts && socialAccounts.length > 0 ? (
          <>
            {
              socialAccounts.map(({ platform, username }) => (
                <Input
                  key={socialPlatformNames[platform]}
                  value={username}
                  name={socialPlatformNames[platform]}
                  placeholder={`${socialPlatformNames[platform]} channel`}
                  type="text"
                  onChange={onChange}
                />
              ))
            }

          </>
        ) : null}

      </fieldset>
      <PrimaryButton
        onClick={signAndBroadcast}
        type="button"
        disabled={formValidity !== ValidationStatus.valid}
      >
        Save
      </PrimaryButton>
      <PrimaryButton onClick={() => setShowForm(false)} className="white" disabled={false} type="button">
        Cancel
      </PrimaryButton>
      <Feedback data={broadcastStatus} />
    </form>
  )
}

export default ProfileEdit;
