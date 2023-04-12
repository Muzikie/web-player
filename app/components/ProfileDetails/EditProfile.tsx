import React from 'react';

/* Internal dependencies */
import { Input, FileInput, Textarea } from '~/components/common/Input';
import { PrimaryButton } from '~/components/common/Button';
import Feedback from '~/components/Feedback';
import { useCreateProfile } from '~/hooks/useCreateEntity';
import { socialPlatformNames } from '~/configs';
import { ProfileEditProps } from './types';
import './profileDetails.css';
import { useForm } from 'react-hook-form';
import { profileSchema } from '~/hooks/useCreateEntity/schemas';
import { yupResolver } from '@hookform/resolvers/yup';

const ProfileEdit = ({ setShowForm }: ProfileEditProps) => {
  const { signAndBroadcast, broadcastStatus, initialValue } = useCreateProfile();

  const { handleSubmit, register, watch, formState } = useForm({
    resolver: yupResolver(profileSchema),
    mode: 'onBlur', // validate on blur
    shouldFocusError: true, // foconBlurus input with error after submit
    defaultValues: {
      name: '',
      nickName: '',
      description: '',
      socialAccounts: initialValue,
      files: [],
      message: '',
    },
  });

  const onSubmit = async (data: Record<string, any>) => {
    await signAndBroadcast(data);
  };

  const errorMessage = Object.values(formState.errors)[0]?.message as string;
  console.log(watch);
  return (
    <form onSubmit={handleSubmit(onSubmit)} className='component editProfile'>
      <fieldset>
        <div>
          <FileInput
            icon='file'
            name='banner'
            accept='.png,.jpg,.jpeg'
            multiple={false}
            title='Click to update banner'
            className='fileInput'
            register={register}
          />
        </div>
        <div>
          <FileInput
            icon='file'
            name='avatar'
            register={register}
            accept='.png,.jpg,.jpeg'
            multiple={false}
            title='Click to update Avatar'
            className='fileInput'
          />
        </div>
        <Input register={register} name='name' placeholder='Enter name' type='text' />
        <Input register={register} name='nickName' placeholder='Enter nickname' type='text' />
        <Textarea
          register={register}
          name='description'
          placeholder='Describe yourself'
          className='descriptionInput'
        />
        {initialValue && initialValue.length > 0 ? (
          <>
            {initialValue.map(({ platform, username }) => (
              <Input
                key={socialPlatformNames[platform]}
                value={username}
                name={socialPlatformNames[platform]}
                placeholder={`${socialPlatformNames[platform]} channel`}
                type='text'
                register={register}
              />
            ))}
          </>
        ) : null}
      </fieldset>
      <PrimaryButton type='submit'>
        <>{broadcastStatus.loading ? <span>loading...</span> : <span>Create</span>}</>
      </PrimaryButton>
      <PrimaryButton
        onClick={() => setShowForm(false)}
        className='white'
        disabled={false}
        type='button'
      >
        Cancel
      </PrimaryButton>
      {formState.errors && Object.keys(formState.errors).length > 0 ? (
        <Feedback
          data={{
            message: errorMessage,
            error: true,
          }}
        />
      ) : (
        <Feedback data={broadcastStatus} />
      )}
    </form>
  );
};

export default ProfileEdit;
