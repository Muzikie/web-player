import React from 'react';

import { Input, FileInput, Textarea } from '~/components/common/Input';
import Icon from '~/components/common/Icon';
import { PrimaryButton } from '~/components/common/Button';
import Feedback from '~/components/Feedback';
import { useCreateProfile, ValidationStatus } from '~/hooks/useCreateEntity';
import { API_URLS, FILES, socialPlatformNames } from '~/configs';
import { ProfileEditProps } from './types';
import { useAccount } from '~/hooks/useAccount/useAccount';
import './profileEdit.css';

const ProfileEdit = ({ setShowForm }: ProfileEditProps) => {
  const {
    name,
    avatar,
    banner,
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
          <FileInput
            icon="file"
            name="banner"
            value={banner}
            accept='.png,.jpg,.jpeg'
            multiple={false}
            title="Click to update banner"
            className="fileInput"
            onChange={onChange}
          />
        </div>
        <div>
          <FileInput
            icon="file"
            name="avatar"
            value={avatar}
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
        disabled={formValidity.status !== ValidationStatus.valid}
      >
        Save
      </PrimaryButton>
      <PrimaryButton onClick={() => setShowForm(false)} className="white" disabled={false} type="button">
        Cancel
      </PrimaryButton>
      {
        ((formValidity.status === ValidationStatus.invalid) && formValidity.message)
          ? <Feedback data={{ message: formValidity.message, error: true }} />
          : <Feedback data={broadcastStatus} />
      }
    </form >
  )
}

export default ProfileEdit;
