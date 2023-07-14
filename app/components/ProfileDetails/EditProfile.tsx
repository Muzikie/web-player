import React from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

/* Internal dependencies */
import { Input, FileInput, Textarea } from '~/components/common/Input';
import { IconButton, PrimaryButton } from '~/components/common/Button';
import Feedback from '~/components/Feedback';
import { useCreateProfile } from '~/hooks/useCreateEntity';
import { socialPlatformNames } from '~/configs';
import { profileSchema } from '~/hooks/useCreateEntity/schemas';
import { ProfileEditProps } from './types';
import './profileDetails.css';

const ProfileEdit = ({ setShowForm, profile }: ProfileEditProps) => {
  const { signAndBroadcast, broadcastStatus } = useCreateProfile();

  const {
    avatarHash,
    avatarSignature,
    bannerHash,
    bannerSignature,
    ...defaultValues
  } = Object.assign({ message: '', avatar: [], banner: [] }, profile);
  console.log(avatarHash, avatarSignature, bannerHash, bannerSignature);
  const { handleSubmit, register, formState, control } = useForm({
    resolver: yupResolver(profileSchema),
    mode: 'onBlur', // validate on blur
    shouldFocusError: true, // focus on input with an error after submission
    defaultValues,
  });
  const { fields, remove } = useFieldArray({
    control,
    rules: { minLength: 3 },
    name: 'socialAccounts',
  });

  const onSubmit = async (data: Record<string, unknown>) => {
    await signAndBroadcast(data, profile);
  };
  const errorMessage = formState.errors && (Object.values(formState.errors)[0]?.message as string);
  const formError = errorMessage
    ? {
      message: errorMessage,
      error: true,
    }
    : broadcastStatus;
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="component editProfile">
      <fieldset>
        <FileInput
          accept=".png,.jpg,.jpeg"
          multiple={false}
          placeholder="Click to update banner"
          className="fileInput"
          {...register('banner', { required: false })}
        />
        <FileInput
          {...register('avatar', { required: false })}
          accept=".png,.jpg,.jpeg"
          multiple={false}
          placeholder="Click to update Avatar"
          className="fileInput"
        />
        <Input
          {...register('name', { required: false })}
          name="name"
          placeholder="Enter name"
          type="text"
        />
        <Input
          {...register('nickName', { required: false })}
          name="nickName"
          placeholder="Enter nickname"
          type="text"
        />
        <Textarea
          {...register('description', { required: false })}
          name="description"
          placeholder="Describe yourself"
          className="descriptionInput"
        />
        {
          fields.map(({ platform }) => (
            <fieldset key={socialPlatformNames[platform]} className="socialAccountInput">
              <Input
                className="input"
                placeholder={socialPlatformNames[platform]}
                type="text"
                {...register(`socialAccounts.${platform}.username`, { required: false })} 
              />
              <IconButton
                icon="trash"
                className="removeButton"
                onClick={() => { remove(platform); }}
              ></IconButton>
            </fieldset>
          ))
        }
      </fieldset>
      <PrimaryButton
        type="submit"
        className="button"
        disabled={formError.error}
      >
        {broadcastStatus.loading ? 'loading...' : 'Create'}
      </PrimaryButton>
      <PrimaryButton
        onClick={() => setShowForm(false)}
        className="button white"
        disabled={false}
        type="button"
      >
        Cancel
      </PrimaryButton>
      <Feedback data={formError} />
    </form>
  );
};

export default ProfileEdit;
