import React from 'react';

/* Internal dependencies */
import { useCreateAudio } from '~/hooks/useCreateEntity';
import { useUserDiscography } from '~/hooks/useUserDiscography/useUserDiscography';
import { Input, FileInput } from '~/components/common/Input';
import { PrimaryButton } from '~/components/common/Button';
import { Select } from '~/components/common/Select';
import { Link } from '~/components/common/Link';
import Feedback from '~/components/Feedback';
import { ROUTES } from '~/routes/routes';
import { VALID_GENRES } from '~/configs';
import { yupResolver } from '@hookform/resolvers/yup';
import { audioSchema } from '~/hooks/useCreateEntity/schemas';
import { useForm } from 'react-hook-form';

const CreateAudio = () => {
  const { signAndBroadcast, broadcastStatus } = useCreateAudio();
  const { collections } = useUserDiscography();

  const { handleSubmit, register, formState } = useForm({
    resolver: yupResolver(audioSchema),
    mode: 'onBlur', // validate on blur
    shouldFocusError: true, // focus input with error after submit
    defaultValues: {
      name: '',
      releaseYear: '',
      collectionID: '',
      genre: 0,
      files: null,
      message: '',
    },
  });

  const onSubmit = async (data: Record<string, any>) => {
    await signAndBroadcast(data);
  };

  const errorMessage = formState.errors && Object.values(formState.errors)[0]?.message as string;
  
  return (
    <form onSubmit={handleSubmit(onSubmit)} className='component createAudio'>
      <fieldset>
        <Input register={register} name='name' placeholder='Enter name' type='text' />
        <Input register={register} name='releaseYear' placeholder='Release year' type='text' />
        <div className='collectionRow'>
          <Select
            placeholder='Select a collection (Collection)'
            name='collectionID'
            options={collections}
            register={register}
          />
          <Link to={ROUTES.UPLOAD_COLLECTION} icon='cross' className='addCollection' />
        </div>
        <Select
          placeholder='Select a genre'
          name='genre'
          options={VALID_GENRES}
          register={register}
        />
        <FileInput
          icon='file'
          name='files'
          accept='.mp3,.wav'
          multiple={false}
          title='Upload MP3'
          register={register}
        />
      </fieldset>
      <PrimaryButton type='submit'>
        <>{broadcastStatus.loading ? <span>loading...</span> : <span>Create</span>}</>
      </PrimaryButton>
      {errorMessage ? (
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

export default CreateAudio;
