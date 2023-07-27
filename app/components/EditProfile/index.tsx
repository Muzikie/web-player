import React from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

/* Internal dependencies */
import { Input, FileInput, Textarea } from '~/components/common/Input';
import { IconButton, PrimaryButton } from '~/components/common/Button';
import Feedback from '~/components/Feedback';
import { useCreateProfile } from '~/hooks/useCreateEntity';
import {
  socialPlatformNames,
  SocialAccountPlatform,
  SocialAccount,
} from '~/configs';
import { profileSchema } from '~/hooks/useCreateEntity/schemas';
import { ProfileEditProps } from './types';
import './profileDetails.css';

const fillSocialMediaInputs = (values: SocialAccount[]) =>
  [
    SocialAccountPlatform.Instagram,
    SocialAccountPlatform.Twitter,
    SocialAccountPlatform.Youtube,
  ].map((platform) => ({
    platform,
    username: values.find((value) => value.platform === platform)?.username ?? '',
  }));

const ProfileEdit = ({ data }: ProfileEditProps) => {
  const { signAndBroadcast, broadcastStatus } = useCreateProfile();

  const {
    avatarHash,
    avatarSignature,
    bannerHash,
    bannerSignature,
    ...defaultValues
  } = Object.assign({ message: '', avatar: [], banner: [] }, data);
  console.log(avatarHash, avatarSignature, bannerHash, bannerSignature);
  const { handleSubmit, register, formState, control } = useForm({
    resolver: yupResolver(profileSchema),
    mode: 'onBlur', // validate on blur
    shouldFocusError: true, // focus on input with an error after submission
    defaultValues: {
      ...defaultValues,
      socialAccounts: fillSocialMediaInputs(defaultValues.socialAccounts),
    },
  });
  const { fields, remove } = useFieldArray({
    control,
    name: 'socialAccounts',
  });

  const onSubmit = async (formValues: Record<string, unknown>) => {
    await signAndBroadcast(formValues, data);
  };
  const errorMessage = formState.errors && (Object.values(formState.errors)[0]?.message as string);
  const formError = errorMessage
    ? {
      message: errorMessage,
      error: true,
    }
    : broadcastStatus;
  return (
    <section className="component editProfile">
      <form onSubmit={handleSubmit(onSubmit)} className="editWrapper">
        <fieldset>
          <FileInput
            accept=".png,.jpg,.jpeg"
            multiple={false}
            placeholder="Click to update banner"
            className={`fileInput ${formState.errors.banner ? 'error' : ''}`}
            {...register('banner', { required: false })}
          />
          <FileInput
            {...register('avatar', { required: false })}
            accept=".png,.jpg,.jpeg"
            multiple={false}
            placeholder="Click to update Avatar"
            className={`fileInput ${formState.errors.avatar ? 'error' : ''}`}
          />
          <Input
            {...register('name', { required: false })}
            name="name"
            placeholder="Enter name"
            type="text"
            className={formState.errors.name ? 'error' : ''}
          />
          <Input
            {...register('nickName', { required: false })}
            name="nickName"
            placeholder="Enter nickname"
            type="text"
            className={formState.errors.nickName ? 'error' : ''}
          />
          <Textarea
            {...register('description', { required: false })}
            name="description"
            placeholder="Describe yourself (255 characters max, make it short and sweet)"
            className={`descriptionInput ${formState.errors.banner ? 'error' : ''}`}
            maxLength={255}
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
          disabled={formError.loading || formError.error}
        >
          {broadcastStatus.loading ? 'loading...' : 'Save'}
        </PrimaryButton>
        <Feedback data={formError} />
      </form>
    </section>
  );
};

export default ProfileEdit;
